import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ExerciseCard } from "./ExerciseCard";

describe("ExerciseCard", () => {
  const mockProps = {
    id: 1,
    title: "Test Exercise",
    description: "This is a test exercise description",
    difficulty: "Medium",
    tags: ["javascript", "algorithms", "arrays"],
    link: "tracks/javascript/exercises/test-exercise",
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it("renders exercise card with correct content", () => {
    renderWithRouter(<ExerciseCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByText(mockProps.difficulty)).toBeInTheDocument();
  });

  it("renders all tags correctly", () => {
    renderWithRouter(<ExerciseCard {...mockProps} />);

    mockProps.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("contains correct exercism link", () => {
    renderWithRouter(<ExerciseCard {...mockProps} />);

    const exerciseLink = screen.getByRole("link", { name: /go to exercise/i });
    expect(exerciseLink).toHaveAttribute(
      "href",
      `https://exercism.org/${mockProps.link}`,
    );
    expect(exerciseLink).toHaveAttribute("target", "_blank");
  });

  it("displays difficulty label correctly", () => {
    renderWithRouter(<ExerciseCard {...mockProps} />);

    const difficultyLabel = screen.getByText(/difficulty:/i);
    expect(difficultyLabel).toBeInTheDocument();
    expect(screen.getByText(mockProps.difficulty)).toBeInTheDocument();
  });
});
