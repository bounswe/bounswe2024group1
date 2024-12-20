import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AnswerCard } from "./AnswerCard";

describe("AnswerCard", () => {
  const mockProps = {
    id: 1,
    title: "Test Answer",
    content: "This is a test answer content",
    votes: 5,
    questionId: 123,
    author: {
      id: 456,
      name: "Test Author",
      profilePicture: "test-profile.jpg",
    },
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it("renders answer card with correct content", () => {
    renderWithRouter(<AnswerCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.content)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.votes} votes`)).toBeInTheDocument();
  });

  it("renders author profile picture", () => {
    renderWithRouter(<AnswerCard {...mockProps} />);

    const profilePicture = screen.getByAltText(
      "Profile picture",
    ) as HTMLImageElement;
    expect(profilePicture).toBeInTheDocument();
    expect(profilePicture.src).toContain(mockProps.author.profilePicture);
  });

  it("renders default profile picture when author picture is not provided", () => {
    const propsWithoutPicture = {
      ...mockProps,
      author: { ...mockProps.author, profilePicture: "" },
    };
    renderWithRouter(<AnswerCard {...propsWithoutPicture} />);

    const profilePicture = screen.getByAltText(
      "Profile picture",
    ) as HTMLImageElement;
    expect(profilePicture).toBeInTheDocument();
    expect(profilePicture.src).toContain("placeholder_profile");
  });

  it("contains correct navigation links", () => {
    renderWithRouter(<AnswerCard {...mockProps} />);

    const authorLink = screen.getByRole("link", { name: /profile picture/i });
    const answerLink = screen.getByRole("link", { name: /go to answer/i });

    expect(authorLink).toHaveAttribute("href", `/users/${mockProps.author.id}`);
    expect(answerLink).toHaveAttribute(
      "href",
      `/question/${mockProps.questionId}`,
    );
  });
});
