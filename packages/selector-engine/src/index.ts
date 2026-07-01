import { z } from "zod";

export const SelectorCandidateSchema = z.object({
  strategy: z.enum(["xpath", "css", "aria", "text", "attr", "position"]),
  value: z.string(),
  confidence: z.number().min(0).max(1),
  specificity: z.number().min(0).max(1).optional(),
  stability: z.number().min(0).max(1).optional(),
  lastVerified: z.coerce.date().optional(),
});

export type SelectorCandidate = z.infer<typeof SelectorCandidateSchema>;

export const SelectorSetSchema = z.object({
  candidates: z.array(SelectorCandidateSchema),
  primaryIndex: z.number().int().nonnegative(),
  fallbackIndices: z.array(z.number().int().nonnegative()).optional(),
});

export type SelectorSet = z.infer<typeof SelectorSetSchema>;

export interface ResolutionResult {
  candidate: SelectorCandidate;
  element: {
    strategy: SelectorCandidate["strategy"];
    value: string;
  };
}

export class SelectorEngine {
  /**
   * Resolve the best selector candidate from a set against a page.
   * Tries primary first, then fallbacks in order.
   */
  async resolve(set: SelectorSet, page: {
    locator(selector: string): { count(): Promise<number> };
  }): Promise<ResolutionResult> {
    const ordered = this.orderedCandidates(set);
    for (const idx of ordered) {
      const candidate = set.candidates[idx];
      try {
        const count = await page.locator(candidate.value).count();
        if (count > 0) {
          return {
            candidate,
            element: { strategy: candidate.strategy, value: candidate.value },
          };
        }
      } catch {
        // continue to next fallback
      }
    }
    throw new Error("No selector candidate resolved");
  }

  /**
   * Return candidate indices ordered by confidence desc, with primary first.
   */
  private orderedCandidates(set: SelectorSet): number[] {
    const map = new Map<number, number>();
    map.set(set.primaryIndex, Infinity);
    for (const [i, c] of set.candidates.entries()) {
      if (i === set.primaryIndex) continue;
      map.set(i, c.confidence);
    }
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map((e) => e[0]);
  }

  /**
   * Score a single candidate based on heuristics (future: ML/self-healing).
   */
  score(candidate: SelectorCandidate): number {
    let score = candidate.confidence * 0.6;
    if (candidate.specificity) score += candidate.specificity * 0.2;
    if (candidate.stability) score += candidate.stability * 0.2;
    return Math.min(1, score);
  }
}
