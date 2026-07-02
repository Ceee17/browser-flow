import { describe, it, expect } from "vitest";
import {
  Organization,
  Project,
  ExecutionStatus,
  ApiError,
  Paginated,
  Membership,
  Agent,
  Schedule,
} from "./index";

describe("shared-types", () => {
  it("exposes shared models", () => {
    const org: Organization = {
      id: "00000000-0000-0000-0000-000000000000",
      name: "ACME",
      slug: "acme",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(org.name).toBe("ACME");

    const statuses: ExecutionStatus[] = [
      "queued",
      "running",
      "succeeded",
      "failed",
      "cancelled",
    ];
    expect(statuses).toHaveLength(5);
  });

  it("builds a paginated response", () => {
    const page: Paginated<Project> = {
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
    };
    expect(page.items).toEqual([]);
  });
});
