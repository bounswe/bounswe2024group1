import { expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("@/services/search", () => {
  return {
    searchDishes: () => Promise.resolve([]),
  };
});

test("App", () => {
  // Arrange
  render(<App />);

  // Act
  fireEvent.change(screen.getAllByPlaceholderText("Search for dishes...")[0], {
    target: { value: "Abc" },
  });
  fireEvent.click(screen.getAllByText("Search")[0]);

  // Assert
  expect(screen.findByText("Go Home")).not.toBeNull();
});
