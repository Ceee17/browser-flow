import { describe, it, expect } from "vitest";
import {
  WorkflowSchema,
  SelectorCandidateSchema,
  SelectorSetSchema,
  validateWorkflow,
  safeValidateWorkflow,
} from "./index";

describe("SelectorCandidateSchema", () => {
  it("accepts a valid candidate", () => {
    const result = SelectorCandidateSchema.safeParse({
      strategy: "css",
      value: "button[type='submit']",
      confidence: 0.95,
    });
    expect(result.success).toBe(true);
  });

  it("rejects confidence outside 0-1", () => {
    const result = SelectorCandidateSchema.safeParse({
      strategy: "xpath",
      value: "//button",
      confidence: 1.5,
    });
    expect(result.success).toBe(false);
  });
});

describe("SelectorSetSchema", () => {
  it("accepts a valid selector set", () => {
    const result = SelectorSetSchema.safeParse({
      candidates: [
        {
          strategy: "css",
          value: "input[name='email']",
          confidence: 0.92,
        },
        {
          strategy: "xpath",
          value: "//input[@id='email']",
          confidence: 0.88,
        },
      ],
      primaryIndex: 0,
      fallbackIndices: [1],
    });
    expect(result.success).toBe(true);
  });
});

describe("WorkflowSchema", () => {
  it("rejects unknown step types", () => {
    const bad = {
      version: "1.0",
      name: "test",
      start: "s1",
      steps: {
        s1: { id: "s1", type: "invalid", url: "https://example.com" },
      },
    };
    const result = WorkflowSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });
});

describe("validateWorkflow", () => {
  it("parses a minimal valid workflow", () => {
    const workflow = {
      version: "1.0",
      name: "login",
      start: "n1",
      steps: {
        n1: {
          id: "n1",
          type: "navigate",
          url: "https://app.example.com/login",
        },
      },
    };
    const data = validateWorkflow(workflow);
    expect(data.version).toBe("1.0");
    expect(data.steps.n1.type).toBe("navigate");
  });
});

describe("safeValidateWorkflow", () => {
  it("returns errors for invalid input", () => {
    const result = safeValidateWorkflow({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });
});
