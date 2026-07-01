import { describe, it, expect } from "vitest";
import { BrowserEngine } from "./index";

describe("BrowserEngine", () => {
  it("exposes supported action types", () => {
    const engine = new BrowserEngine();
    expect(engine.supportedActions).toContain("navigate");
    expect(engine.supportedActions).toContain("click");
    expect(engine.supportedActions).toContain("type");
    expect(engine.supportedActions).toContain("screenshot");
  });

  it("exposes 14 supported browser actions", () => {
    const engine = new BrowserEngine();
    expect(engine.supportedActions.length).toBe(14);
  });
});
