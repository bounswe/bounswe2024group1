import { expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("zustand/middleware", () => ({
  persist: (a: unknown) => a,
  createJSONStorage: () => null,
}));

vi.mock("@/services/search", () => {
  return {
    searchDishes: () => Promise.resolve([]),
  };
});

test("App", () => {
  // Arrange
  render(<App />);

  // Act
  fireEvent.change(screen.getByLabelText("Search for dishes"), {
    target: { value: "Abc" },
  });
  fireEvent.click(screen.getByRole("button"));

  // Assert
  expect(screen.findByText("Go Home")).not.toBeNull();
});
