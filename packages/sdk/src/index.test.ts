import { describe, it, expect } from "vitest";
import { BrowserFlowClient } from "./index";

describe("BrowserFlowClient", () => {
  it("creates a client with config", () => {
    const client = new BrowserFlowClient({
      baseUrl: "http://localhost:4000",
      apiKey: "test",
    });
    expect(client).toBeDefined();
  });

  it("returns auth header with Bearer token", async () => {
    const client = new BrowserFlowClient({
      baseUrl: "http://localhost:4000",
      apiKey: "abc123",
    });

    const header = (client as unknown as { authHeader(): Record<string, string> }).authHeader();
    expect(header.Authorization).toBe("Bearer abc123");
  });
});
