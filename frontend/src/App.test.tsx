import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("App", () => {
  // Arrange
  render(<App />);

  // Act
  fireEvent.click(screen.getByRole("button"));

  // Assert
  expect(screen.getByRole("button").textContent).toBe("count is 1");
});
