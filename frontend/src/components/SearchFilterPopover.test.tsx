import { render, fireEvent, screen } from "@testing-library/react";
import SearchFilterPopover from "./SearchFilterPopover";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("SearchFilterPopover", () => {
  let cuisine: string,
    setCuisine: (s: string) => void,
    foodType: string,
    setFoodType: (s: string) => void;

  beforeEach(() => {
    // Arrange
    cuisine = "";
    setCuisine = vi.fn();
    foodType = "";
    setFoodType = vi.fn();
  });

  test("does not call set functions when closed without confirming", () => {
    render(
      <SearchFilterPopover
        cuisine={cuisine}
        setCuisine={setCuisine}
        foodType={foodType}
        setFoodType={setFoodType}
      />,
    );

    // Act
    const filterButton = screen.getByRole("button", { name: /filter/i });
    fireEvent.click(filterButton); // Open the popover

    const italianCheckbox = screen.getByLabelText(/italian/i);
    fireEvent.click(italianCheckbox);

    const popoverCloseButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(popoverCloseButton); // Close the popover without confirming

    // Assert
    expect(setCuisine).not.toHaveBeenCalled();
    expect(setFoodType).not.toHaveBeenCalled();
  });

  test("calls set functions with correct values when confirmed", () => {
    render(
      <SearchFilterPopover
        cuisine={cuisine}
        setCuisine={setCuisine}
        foodType={foodType}
        setFoodType={setFoodType}
      />,
    );

    // Act
    const filterButton = screen.getByRole("button", { name: /filter/i });
    fireEvent.click(filterButton); // Open the popover

    const italianCheckbox = screen.getByLabelText(/italian/i);
    fireEvent.click(italianCheckbox);

    const meatCheckbox = screen.getByLabelText(/meat/i);
    fireEvent.click(meatCheckbox);

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton); // Confirm the selection

    // Assert
    expect(setCuisine).toHaveBeenCalledWith("Italian");
    expect(setFoodType).toHaveBeenCalledWith("Meat");
  });
});
