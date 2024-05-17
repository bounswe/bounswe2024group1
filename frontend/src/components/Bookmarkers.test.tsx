import { render, fireEvent, screen } from "@testing-library/react";
import { vi, test, Mock, expect, describe, beforeEach } from "vitest";
import { Bookmarkers } from "./Bookmarkers";
import { MemoryRouter } from "react-router-dom";
import { useGetBookmarkers } from "@/services/api/semanticBrowseComponents";

// Mocking the useGetBookmarkers hook
vi.mock("@/services/api/semanticBrowseComponents", () => ({
  useGetBookmarkers: vi.fn().mockReturnValue({
    data: null,
    isLoading: false,
    error: true,
  }),
  useFollowUser: vi.fn().mockReturnValue({
    data: null,
    isLoading: false,
    error: true,
  }),
  useGetUserById: vi.fn().mockReturnValue({
    data: null,
    isLoading: false,
    error: true,
  }),
  useUnfollowUser: vi.fn().mockReturnValue({
    data: null,
    isLoading: false,
    error: true,
  }),
}));

describe("Bookmarkers", () => {
  let recipeId: string;

  beforeEach(() => {
    recipeId = "1";
    vi.clearAllMocks();
  });

  test("displays error state when there is an error", () => {
    (useGetBookmarkers as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(<Bookmarkers recipeId={recipeId} />);
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });

  test("checks if bookmarkers button works on click", () => {
    (useGetBookmarkers as Mock).mockReturnValue({
      data: { data: [{ id: 1 }, { id: 2 }] },
      isLoading: false,
      error: null,
    });
    render(
      <MemoryRouter>
        <Bookmarkers recipeId={recipeId} />
      </MemoryRouter>,
    );

    // Act
    const bookmarkersButton = screen
      .getByText(/see bookmarkers/i)
      .closest("span");
    fireEvent.click(bookmarkersButton); // Open the popover
    expect(
      screen.getByRole("heading", { name: "Bookmarkers" }),
    ).toBeInTheDocument();

    const popoverCloseButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(popoverCloseButton); // Close the popover without confirming
    expect(
      screen.queryByRole("heading", { name: "Bookmarkers" }),
    ).not.toBeInTheDocument();
  });
});
