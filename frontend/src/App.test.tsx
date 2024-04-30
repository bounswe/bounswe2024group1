import { test, vi } from "vitest";

vi.mock("@/services/search", () => {
  return {
    searchDishes: () => Promise.resolve([]),
  };
});

test("empty", () => {});
