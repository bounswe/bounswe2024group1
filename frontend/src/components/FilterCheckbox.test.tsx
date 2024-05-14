import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import FilterCheckbox from "./FilterCheckbox";

test("label renders text with label", () => {
  // Arrange
  render(<FilterCheckbox label="Meat" />);

  // Act
  const label = screen.getByText("Meat");

  // Assert
  expect(label).toBeInTheDocument();
});

test("clicking on the label triggers onChange", async () => {
  const change = vi.fn();

  // Arrange
  render(<FilterCheckbox label="Meat" onChange={change} />);

  // Act
  const label = screen.getByText("Meat");
  fireEvent.click(label);

  // Assert
  await waitFor(() => {
    expect(change).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: true,
        }),
      }),
    );
  });
});
