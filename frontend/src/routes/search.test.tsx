import {
  SearchTagsError,
  useSearchTags,
} from "@/services/api/programmingForumComponents";
import { TagSummary } from "@/services/api/programmingForumSchemas";
import { testAccessibility } from "@/utils/test-accessibility";
import { QueryObserverSuccessResult } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  MemoryRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { routeConfig } from ".";
import { Search } from "./search";

// Mock the useSearchTags hook
vi.mock("@/services/api/programmingForumComponents", () => ({
  useSearchTags: vi.fn(),
}));

const mockTags: TagSummary[] = [
  { id: "1", name: "Japan" },
  { id: "2", name: "Sausage" },
];

describe("Search component", () => {
  beforeEach(() => {
    vi.mocked(useSearchTags).mockReset();
  });
  it("should have no accessibility violations", async () => {
    // Arrange
    const router = createMemoryRouter(routeConfig, {
      initialEntries: ["/search?q=test"],
    });

    await testAccessibility(<RouterProvider router={router} />);
  });

  it("renders loading state", () => {
    vi.mocked(useSearchTags).mockReturnValue({
      isLoading: true,
      error: null,
      data: undefined,
    } as unknown as QueryObserverSuccessResult<unknown, SearchTagsError>);

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <Routes>
          <Route path="/search" element={<Search />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it("renders tags correctly", () => {
    vi.mocked(useSearchTags).mockReturnValue({
      isLoading: false,
      error: null,
      data: { data: { items: mockTags } },
    } as QueryObserverSuccessResult<unknown, SearchTagsError>);

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <Routes>
          <Route path="/search" element={<Search />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByText(`Found ${mockTags.length} results`),
    ).toBeInTheDocument();

    mockTags.forEach((tag) => {
      expect(screen.getByText(tag.name!)).toBeInTheDocument();
    });
  });

  it("renders no results message", () => {
    vi.mocked(useSearchTags).mockReturnValue({
      isLoading: false,
      error: null,
      data: { data: { items: [] } },
    } as QueryObserverSuccessResult<unknown, SearchTagsError>);

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <Routes>
          <Route path="/search" element={<Search />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("No tags found")).toBeInTheDocument();
    expect(
      screen.getByText('Try searching for "python", or "javascript"'),
    ).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useSearchTags).mockReturnValue({
      isLoading: false,
      error: {
        status: 500,
        payload: {
          status: 500,
          error: { errorMessage: "An error occurred", stackTrace: "" },
        },
      },
      data: undefined,
    } as unknown as QueryObserverSuccessResult<unknown, SearchTagsError>);

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <Routes>
          <Route path="/search" element={<Search />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });
});
