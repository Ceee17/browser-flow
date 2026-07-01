import { StepType } from "@browserflow/workflow-schema";

export interface PlaywrightContext {
  goto(url: string): Promise<void>;
  click(selector: string): Promise<void>;
  dblclick(selector: string): Promise<void>;
  hover(selector: string): Promise<void>;
  type(selector: string, text: string): Promise<void>;
  press(key: string): Promise<void>;
  waitForTimeout(ms: number): Promise<void>;
  screenshot(options?: { fullPage?: boolean }): Promise<Buffer>;
  scroll(direction: "up" | "down" | "left" | "right", amount?: number): Promise<void>;
  setInputFiles(selector: string, files: string[]): Promise<void>;
  waitForDownload(): Promise<{ suggestedFilename(): string }>;
  textContent(selector: string): Promise<string | null>;
  innerText(selector: string): Promise<string>;
  evaluate(script: string): Promise<unknown>;
}

export const SUPPORTED_ACTIONS: readonly StepType[] = [
  "navigate",
  "click",
  "dblclick",
  "hover",
  "type",
  "press",
  "wait",
  "screenshot",
  "scroll",
  "upload",
  "download",
  "extract-text",
  "extract-table",
  "execute-script",
];

export class BrowserEngine {
  readonly supportedActions = [...SUPPORTED_ACTIONS];

  async navigate(ctx: PlaywrightContext, url: string): Promise<void> {
    await ctx.goto(url);
  }

  async click(ctx: PlaywrightContext, selector: string): Promise<void> {
    await ctx.click(selector);
  }

  async dblclick(ctx: PlaywrightContext, selector: string): Promise<void> {
    await ctx.dblclick(selector);
  }

  async hover(ctx: PlaywrightContext, selector: string): Promise<void> {
    await ctx.hover(selector);
  }

  async type(ctx: PlaywrightContext, selector: string, text: string): Promise<void> {
    await ctx.type(selector, text);
  }

  async press(ctx: PlaywrightContext, key: string): Promise<void> {
    await ctx.press(key);
  }

  async wait(ctx: PlaywrightContext, ms: number): Promise<void> {
    await ctx.waitForTimeout(ms);
  }

  async screenshot(ctx: PlaywrightContext, fullPage = false): Promise<Buffer> {
    return ctx.screenshot({ fullPage });
  }

  async scroll(
    ctx: PlaywrightContext,
    direction: "up" | "down" | "left" | "right",
    amount = 500
  ): Promise<void> {
    await ctx.scroll(direction, amount);
  }

  async upload(ctx: PlaywrightContext, selector: string, files: string[]): Promise<void> {
    await ctx.setInputFiles(selector, files);
  }

  async download(ctx: PlaywrightContext): Promise<{ filename: string }> {
    const download = await ctx.waitForDownload();
    return { filename: download.suggestedFilename() };
  }

  async extractText(ctx: PlaywrightContext, selector: string): Promise<string> {
    return ctx.innerText(selector);
  }

  async evaluate(ctx: PlaywrightContext, script: string): Promise<unknown> {
    return ctx.evaluate(script);
  }
}
