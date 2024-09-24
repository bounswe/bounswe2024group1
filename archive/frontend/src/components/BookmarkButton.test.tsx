import { describe, it, beforeEach, expect, vi, Mock } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import {
  useGetMe,
  useGetBookmarkers,
  useGetRecipeById,
  useBookmarkRecipe,
  useUnbookmarkRecipe,
} from "@/services/api/semanticBrowseComponents";
import BookmarkButton from "./BookmarkButton";

vi.mock("@/services/api/semanticBrowseComponents", () => ({
  useGetMe: vi.fn(),
  useGetBookmarkers: vi.fn(),
  useGetRecipeById: vi.fn(),
  useBookmarkRecipe: vi
    .fn()
    .mockReturnValue({ mutateAsync: vi.fn().mockResolvedValue({}) }),
  useUnbookmarkRecipe: vi
    .fn()
    .mockReturnValue({ mutateAsync: vi.fn().mockResolvedValue({}) }),
}));

describe("BookmarkButton", () => {
  const refetch = vi.fn().mockResolvedValue(true);
  let bookmarked = false;
  let shouldSucceed = true;
  const unbookmarkMock = vi.fn(() =>
    shouldSucceed
      ? ((bookmarked = false), Promise.resolve())
      : Promise.reject(),
  );
  const bookmarkMock = vi.fn(() =>
    shouldSucceed ? ((bookmarked = true), Promise.resolve()) : Promise.reject(),
  );

  beforeEach(() => {
    bookmarked = false;

    (useGetRecipeById as Mock).mockImplementation(() => ({
      isLoading: false,
      data: { data: { selfBookmarked: bookmarked } },
      error: null,
      refetch,
    }));

    (useBookmarkRecipe as Mock).mockImplementation(
      ({ onSuccess, onError } = {}) => ({
        mutateAsync: (...args: unknown[]) =>
          // @ts-expect-error we don't care about the args
          bookmarkMock(...args).then(onSuccess, onError),
      }),
    );
    (useUnbookmarkRecipe as Mock).mockImplementation(
      ({ onSuccess, onError } = {}) => ({
        mutateAsync: (...args: unknown[]) =>
          // @ts-expect-error we don't care about the args
          unbookmarkMock(...args).then(onSuccess, onError),
      }),
    );
    (useGetMe as Mock).mockReturnValue({
      refetch: vi.fn().mockResolvedValue(true),
    });
    (useGetBookmarkers as Mock).mockReturnValue({
      refetch: vi.fn().mockResolvedValue(true),
    });
  });

  it("should render the bookmark button correctly", () => {
    render(<BookmarkButton recipe={{ id: 1 }} />);
    expect(screen.getByText("Bookmark")).toBeInTheDocument();
  });

  describe("when not bookmarked", () => {
    it("should trigger bookmark and refetch on click when successful", async () => {
      bookmarked = false;
      shouldSucceed = true;

      render(<BookmarkButton recipe={{ id: 1 }} />);

      act(() => {
        fireEvent.click(screen.getByText("Bookmark"));
      });

      await waitFor(() => {
        expect(bookmarkMock).toHaveBeenCalledWith({
          pathParams: { recipeId: 1 },
        });
      });

      await waitFor(() => {
        expect((useGetRecipeById as Mock)().refetch).toHaveBeenCalled();
        expect((useGetMe as Mock)().refetch).toHaveBeenCalled();
        expect((useGetBookmarkers as Mock)().refetch).toHaveBeenCalled();
        expect(unbookmarkMock).not.toHaveBeenCalled();
        expect(screen.getByText("Bookmarked")).toBeInTheDocument();
      });
    });

    it("should trigger bookmark and return to unbookmarked on error", async () => {
      bookmarked = false;
      shouldSucceed = false;

      render(<BookmarkButton recipe={{ id: 1 }} />);

      act(() => {
        fireEvent.click(screen.getByText("Bookmark"));
      });

      await waitFor(() => {
        expect(bookmarkMock).toHaveBeenCalledWith({
          pathParams: { recipeId: 1 },
        });
      });

      await waitFor(() => {
        expect(unbookmarkMock).not.toHaveBeenCalled();
        expect(screen.getByText("Bookmark")).toBeInTheDocument();
      });
    });
  });

  describe("when bookmarked", () => {
    it("should trigger unbookmark and refetch on click when bookmarked", async () => {
      bookmarked = true;
      shouldSucceed = true;

      render(<BookmarkButton recipe={{ id: 1 }} />);
      act(() => {
        fireEvent.click(screen.getByText("Bookmarked"));
      });

      await waitFor(() => {
        expect(unbookmarkMock).toHaveBeenCalledWith({
          pathParams: { recipeId: 1 },
        });
        expect((useGetRecipeById as Mock)().refetch).toHaveBeenCalled();
        expect((useGetMe as Mock)().refetch).toHaveBeenCalled();
        expect((useGetBookmarkers as Mock)().refetch).toHaveBeenCalled();
        expect(screen.getByText("Bookmark")).toBeInTheDocument();
      });
    });

    it("should trigger unbookmark and still show bookmarked on error", async () => {
      bookmarked = true;
      shouldSucceed = false;

      render(<BookmarkButton recipe={{ id: 1 }} />);
      act(() => {
        fireEvent.click(screen.getByText("Bookmarked"));
      });

      expect(unbookmarkMock).toHaveBeenCalledWith({
        pathParams: { recipeId: 1 },
      });

      await waitFor(() => {
        expect(screen.getByText("Bookmarked")).toBeInTheDocument();
      });
    });
  });
});
