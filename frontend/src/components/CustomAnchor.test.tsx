import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CustomAnchor from "./CustomAnchor";

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("CustomAnchor", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("renders a span when no href is provided", () => {
    render(
      <MemoryRouter>
        <CustomAnchor>Test Link</CustomAnchor>
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Link").tagName).toBe("SPAN");
  });

  it("renders an anchor with correct href when provided", () => {
    render(
      <MemoryRouter>
        <CustomAnchor href="#tag-123">Test Link</CustomAnchor>
      </MemoryRouter>,
    );

    const link = screen.getByText("Test Link");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "#tag-123");
  });

  it("navigates to tag page when tag link is clicked", () => {
    render(
      <MemoryRouter>
        <CustomAnchor href="#tag-123">Tag Link</CustomAnchor>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("Tag Link"));
    expect(mockNavigate).toHaveBeenCalledWith("/tag/123");
  });

  it("navigates to question page when question link is clicked", () => {
    render(
      <MemoryRouter>
        <CustomAnchor href="#q-456">Question Link</CustomAnchor>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("Question Link"));
    expect(mockNavigate).toHaveBeenCalledWith("/question/456");
  });

  it("sets correct title for tag links", () => {
    render(
      <MemoryRouter>
        <CustomAnchor href="#tag-123">Tag Link</CustomAnchor>
      </MemoryRouter>,
    );

    expect(screen.getByText("Tag Link")).toHaveAttribute("title", "Tag: 123");
  });

  it("sets correct title for question links", () => {
    render(
      <MemoryRouter>
        <CustomAnchor href="#q-456">Question Link</CustomAnchor>
      </MemoryRouter>,
    );

    expect(screen.getByText("Question Link")).toHaveAttribute(
      "title",
      "Question: 456",
    );
  });

  it("sets loading title for invalid href patterns", () => {
    render(
      <MemoryRouter>
        <CustomAnchor href="invalid-href">Invalid Link</CustomAnchor>
      </MemoryRouter>,
    );

    expect(screen.getByText("Invalid Link")).toHaveAttribute(
      "title",
      "Loading...",
    );
  });
});
