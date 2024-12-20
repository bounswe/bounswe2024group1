/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateQuestion,
  useSearchTags,
} from "@/services/api/programmingForumComponents";
import {
  UseMutationResult,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate, useSearchParams } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import QuestionCreationPage from "./create-question";

// Mock the API hooks
vi.mock("@/services/api/programmingForumComponents", () => ({
  useCreateQuestion: vi.fn(),
  useSearchTags: vi.fn(),
}));

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

// Mock react-query
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueryClient: vi.fn(),
  };
});

describe("QuestionCreationPage", () => {
  const mockNavigate = vi.fn();
  const mockQueryClient = {
    invalidateQueries: vi.fn(),
  };
  const mockCreateQuestion = vi.fn();
  const mockSearchParams = new URLSearchParams();

  const mockTags = [
    { tagId: "1", name: "javascript" },
    { tagId: "2", name: "python" },
  ];

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useQueryClient).mockReturnValue(mockQueryClient as any);
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);

    vi.mocked(useCreateQuestion).mockReturnValue({
      mutateAsync: mockCreateQuestion,
      isLoading: false,
    } as unknown as UseMutationResult<any, any, any>);

    vi.mocked(useSearchTags).mockReturnValue({
      data: {
        data: {
          items: mockTags,
        },
      },
      isLoading: false,
    } as unknown as UseQueryResult<any, any>);
  });

  it("renders the form correctly", () => {
    render(
      <MemoryRouter>
        <QuestionCreationPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Create a new question")).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /difficulty/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(
      <MemoryRouter>
        <QuestionCreationPage />
      </MemoryRouter>,
    );

    // Submit without filling the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
      expect(screen.getByText("Content is required")).toBeInTheDocument();
      expect(
        screen.getByText("At least one tag is required"),
      ).toBeInTheDocument();
    });
  });

  it("loads tags from URL parameters", () => {
    const mockSearchParamsWithTags = new URLSearchParams();
    mockSearchParamsWithTags.set("tagIds", "1,2");
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParamsWithTags,
      vi.fn(),
    ]);

    render(
      <MemoryRouter>
        <QuestionCreationPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("javascript")).toBeInTheDocument();
    expect(screen.getByText("python")).toBeInTheDocument();
  });

  it("toggles preview mode", () => {
    render(
      <MemoryRouter>
        <QuestionCreationPage />
      </MemoryRouter>,
    );

    const previewButton = screen.getByRole("button", { name: /preview/i });
    fireEvent.click(previewButton);

    expect(screen.getByText("Preview")).toBeInTheDocument();

    fireEvent.click(previewButton);
    expect(screen.queryByText("Preview Mode")).not.toBeInTheDocument();
  });
});
