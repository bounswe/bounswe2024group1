import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchBar } from "./SearchBar";

const renderSearchBar = () =>
  render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>,
  );

describe("SearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("shows tooltip on first load and hides after 3 seconds", async () => {
    renderSearchBar();

    // Tooltip should be visible initially
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    // Fast-forward time by 3 seconds
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on focus after first load", () => {
    localStorage.setItem("searchTooltipShown", "true");
    renderSearchBar();
    const input = screen.getByPlaceholderText(/search tags/i);

    // Initially tooltip should be hidden
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    act(() => {
      // Focus the input
      fireEvent.focus(input);
    });

    // Tooltip should be visible
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    act(() => {
      // Blur the input
      fireEvent.blur(input);
    });

    // Tooltip should be hidden again
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("focuses search input when '/' is pressed", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText(/search tags/i);

    act(() => {
      fireEvent.keyDown(document, { key: "/" });
    });
    expect(document.activeElement).toBe(input);
  });

  it("focuses search input when Cmd+K is pressed", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText(/search tags/i);

    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });
    expect(document.activeElement).toBe(input);
  });

  it("doesn't trigger shortcuts when typing in input", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText(/search tags/i);

    act(() => {
      input.focus();
    });
    act(() => {
      fireEvent.keyDown(input, { key: "/" });
    });
    expect(document.activeElement).toBe(input);
  });
  it("switches search type when dropdown option is clicked", async () => {
    renderSearchBar();

    // Click the dropdown trigger button
    const triggerButton = screen.getByRole("button", { name: /tags/i });
    fireEvent.pointerDown(
      triggerButton,
      new PointerEvent("pointerdown", {
        ctrlKey: false,
        button: 0,
      }),
    );

    const questionsOption = screen.queryByTestId("search-type-questions");
    expect(questionsOption).toBeInTheDocument();

    if (questionsOption) {
      fireEvent.click(questionsOption);
    }

    // After clicking, verify the input's placeholder has changed
    const input = screen.getByRole("textbox", { name: /search/i });
    expect(input).toHaveAttribute(
      "placeholder",
      expect.stringMatching(/questions/i),
    );
  });
});
