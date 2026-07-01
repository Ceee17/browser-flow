import { describe, it, expect } from "vitest";
import { TriggerSchema } from "./index";

describe("TriggerSchema", () => {
  it("accepts manual trigger", () => {
    expect(() => TriggerSchema.parse({ type: "manual" })).not.toThrow();
  });

  it("accepts cron trigger", () => {
    expect(() =>
      TriggerSchema.parse({ type: "cron", cron: "0 9 * * *" })
    ).not.toThrow();
  });

  it("rejects empty cron trigger", () => {
    expect(() =>
      TriggerSchema.parse({ type: "cron", cron: "" })
    ).toThrow();
  });

  it("accepts webhook trigger", () => {
    expect(() =>
      TriggerSchema.parse({ type: "webhook", path: "/run/abc" })
    ).not.toThrow();
  });
});
