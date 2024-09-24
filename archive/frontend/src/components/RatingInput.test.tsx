import { render, fireEvent, screen } from "@testing-library/react";
import RatingInput from "./RatingInput";
import { beforeEach, describe, test, expect, vi } from "vitest";

describe("RatingInput", () => {
  let currentRating: number, setRating: (s: number) => void;

  beforeEach(() => {
    // Arrange
    currentRating = 3;
    setRating = vi.fn();
  });

  test("renders correct number of stars based on currentRating", () => {
    render(<RatingInput currentRating={currentRating} setRating={setRating} />);

    // Assert
    const filledStars = screen.getAllByLabelText(/filled star/i);
    const emptyStars = screen.getAllByLabelText(/empty star/i);
    expect(filledStars.length).toBe(currentRating);
    expect(emptyStars.length).toBe(5 - currentRating);
  });

  test("updates tempRating on mouse enter and resets on mouse leave", () => {
    render(<RatingInput currentRating={currentRating} setRating={setRating} />);

    // Act
    const fourthStar = screen.getAllByLabelText(/empty star/i)[0];
    fireEvent.mouseEnter(fourthStar);

    // Assert
    const filledStars = screen.getAllByLabelText(/filled star/i);
    expect(filledStars.length).toBe(4);

    // Act
    fireEvent.mouseLeave(fourthStar);

    // Assert
    const filledStarsAfterLeave = screen.getAllByLabelText(/filled star/i);
    expect(filledStarsAfterLeave.length).toBe(currentRating);
  });

  test("calls setRating with correct value on click", () => {
    render(<RatingInput currentRating={currentRating} setRating={setRating} />);

    // Act
    const secondStar = screen.getAllByLabelText(/filled star/i)[1];
    fireEvent.click(secondStar);

    // Assert
    expect(setRating).toHaveBeenCalledWith(2);
  });
});
