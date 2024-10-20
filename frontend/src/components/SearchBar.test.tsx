import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

vi.mock("react-router-dom", () => {
  const navigate = vi.fn();
  return {
    useSearchParams: () => [new URLSearchParams("")],
    useNavigate: () => navigate,
  };
});

test("searching something goes to /search", async () => {
  // Arrange
  render(<SearchBar />);

  // Act
  const search = screen.getAllByPlaceholderText("Search for...")[0];
  fireEvent.change(search, { target: { value: "hello" } });

  const button = screen.getAllByRole("button", { name: /search/i })[0];
  fireEvent.click(button);

  // Assert
  await waitFor(() => {
    expect(useNavigate()).toHaveBeenCalledWith("/search?type=tags&q=hello");
  });
});
