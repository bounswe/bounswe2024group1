/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchQuestions } from "@/services/api/programmingForumComponents";
import { DifficultyLevel } from "@/services/api/programmingForumSchemas";
import { UseQueryResult } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SearchQuestionsList } from "./SearchQuestionsList";

// Mock the API hooks
vi.mock("@/services/api/programmingForumComponents", () => ({
  useSearchQuestions: vi.fn(),
}));

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe("SearchQuestionsList", () => {
  const mockQuestions = [
    {
      id: 1,
      title: "Test Question 1",
      content: "Content 1",
      difficulty: "EASY" as DifficultyLevel,
      upvoteCount: 5,
      downvoteCount: 1,
      answerCount: 2,
    },
    {
      id: 2,
      title: "Test Question 2",
      content: "Content 2",
      difficulty: "MEDIUM" as DifficultyLevel,
      upvoteCount: 3,
      downvoteCount: 0,
      answerCount: 1,
    },
  ];

  const mockSearchParams = new URLSearchParams();
  mockSearchParams.set("q", "test");
  mockSearchParams.set("sortBy", "recommended");

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);
    vi.mocked(useSearchQuestions).mockReturnValue({
      data: {
        data: {
          items: mockQuestions,
          totalItems: mockQuestions.length,
        },
      },
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<any, any>);
  });

  it("renders search results correctly", () => {
    render(
      <MemoryRouter>
        <SearchQuestionsList />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(`Found ${mockQuestions.length} results`),
    ).toBeInTheDocument();
    mockQuestions.forEach((question) => {
      expect(screen.getByText(question.title)).toBeInTheDocument();
      expect(screen.getByText(question.content)).toBeInTheDocument();
    });
  });

  it("displays loading state", () => {
    vi.mocked(useSearchQuestions).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    } as unknown as UseQueryResult<any, any>);

    render(
      <MemoryRouter>
        <SearchQuestionsList />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error state", () => {
    const errorMessage = "Failed to fetch questions";

    vi.mocked(useSearchQuestions).mockReturnValue({
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
        <SearchQuestionsList />
      </MemoryRouter>,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("displays empty state message when no results", () => {
    vi.mocked(useSearchQuestions).mockReturnValue({
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
        <SearchQuestionsList />
      </MemoryRouter>,
    );

    expect(screen.getByText("No questions found")).toBeInTheDocument();
    expect(
      screen.getByText("Try searching for specific topics or keywords."),
    ).toBeInTheDocument();
  });

  it("handles difficulty filter change", () => {
    render(
      <MemoryRouter>
        <SearchQuestionsList />
      </MemoryRouter>,
    );

    const difficultyFilter = screen.getByRole("combobox");
    fireEvent.click(difficultyFilter);
    const mediumOption = screen.getAllByText("Medium");
    fireEvent.click(mediumOption[1]);

    expect(useSearchQuestions).toHaveBeenCalledWith(
      expect.objectContaining({
        queryParams: expect.objectContaining({
          difficulty: "MEDIUM",
        }),
      }),
    );
  });
});
