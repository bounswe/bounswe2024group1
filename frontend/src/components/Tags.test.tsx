/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchTags } from "@/services/api/programmingForumComponents";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import { UseQueryResult } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TagsPage from "./Tags";

// Mock the API hooks
vi.mock("@/services/api/programmingForumComponents", () => ({
  useSearchTags: vi.fn(),
}));

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe("TagsPage", () => {
  const mockTags: Partial<TagDetails>[] = [
    {
      tagId: "1",
      name: "JavaScript",
      description: "A programming language",
      logoImage: "js-logo.png",
    },
    {
      tagId: "2",
      name: "Python",
      description: "Another programming language",
      logoImage: "python-logo.png",
    },
  ];

  const mockSearchParams = new URLSearchParams();
  mockSearchParams.set("q", "");

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);
    vi.mocked(useSearchTags).mockReturnValue({
      data: {
        data: {
          items: mockTags,
          totalItems: mockTags.length,
        },
      },
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<any, any>);
  });

  it("renders tags list correctly", () => {
    render(
      <MemoryRouter>
        <TagsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Tags")).toBeInTheDocument();
    mockTags.forEach((tag) => {
      expect(screen.getByText(tag.name!)).toBeInTheDocument();
      expect(screen.getByText(tag.description!)).toBeInTheDocument();
      expect(
        screen.getByAltText(`The logo image of ${tag.name}`),
      ).toHaveAttribute("src", tag.logoImage!);
    });
  });

  it("displays loading state", () => {
    vi.mocked(useSearchTags).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    } as unknown as UseQueryResult<any, any>);

    render(
      <MemoryRouter>
        <TagsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error state", () => {
    const errorMessage = "Failed to fetch tags";
    vi.mocked(useSearchTags).mockReturnValue({
      data: null,
      isLoading: false,
      error: {
        status: 500,
        payload: {
          status: 500,
          error: {
            errorMessage,
            stackTrace: "Stack trace",
          },
        },
      },
    } as unknown as UseQueryResult<any, any>);

    render(
      <MemoryRouter>
        <TagsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("shows create tag button", () => {
    render(
      <MemoryRouter>
        <TagsPage />
      </MemoryRouter>,
    );

    const createButton = screen.getByRole("link", { name: /create tag/i });
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveAttribute("href", "/tags/new");
  });

  it("loads more tags when scrolling", () => {
    const { container } = render(
      <MemoryRouter>
        <TagsPage />
      </MemoryRouter>,
    );

    const infiniteScroll = container.querySelector("div");
    fireEvent.scroll(infiniteScroll as Element);

    expect(useSearchTags).toHaveBeenCalledWith(
      expect.objectContaining({
        queryParams: expect.objectContaining({
          pageSize: 20,
        }),
      }),
      expect.any(Object),
    );
  });

  it("handles empty tags list", () => {
    vi.mocked(useSearchTags).mockReturnValue({
      data: {
        data: {
          items: [],
          totalItems: 0,
        },
      },
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<any, any>);

    render(
      <MemoryRouter>
        <TagsPage />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("updates search results when query changes", () => {
    const searchParams = new URLSearchParams();
    searchParams.set("q", "javascript");
    vi.mocked(useSearchParams).mockReturnValue([searchParams, vi.fn()]);

    render(
      <MemoryRouter>
        <TagsPage />
      </MemoryRouter>,
    );

    expect(useSearchTags).toHaveBeenCalledWith(
      expect.objectContaining({
        queryParams: expect.objectContaining({
          q: "javascript",
        }),
      }),
      expect.any(Object),
    );
  });
});
