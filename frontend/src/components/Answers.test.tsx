import {
  GetQuestionAnswersError,
  GetQuestionAnswersResponse,
  RateAnswerError,
  RateAnswerVariables,
  useGetQuestionAnswers,
  useRateAnswer,
} from "@/services/api/programmingForumComponents";
import useAuthStore from "@/services/auth";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Answers } from "./Answers";

// Mock the API hooks
vi.mock("@/services/api/programmingForumComponents", () => ({
  useGetQuestionAnswers: vi.fn(),
  useRateAnswer: vi.fn(),
}));

// Mock the auth store
vi.mock("@/services/auth", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockAnswers = [
  {
    id: 1,
    content: "This is answer 1",
    author: { username: "user1", name: "User One" },
    createdAt: "2023-01-01T00:00:00Z",
    rating: 5,
  },
  {
    id: 2,
    content: "This is answer 2",
    author: { username: "user2", name: "User Two" },
    createdAt: "2023-01-02T00:00:00Z",
    rating: 3,
  },
];

describe("Answers", () => {
  beforeEach(() => {
    vi.mocked(useGetQuestionAnswers).mockReturnValue({
      data: { data: { items: mockAnswers } },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    } as unknown as UseQueryResult<
      GetQuestionAnswersResponse,
      GetQuestionAnswersError
    >);
    vi.mocked(useRateAnswer).mockReturnValue({
      mutateAsync: vi.fn(),
    } as unknown as UseMutationResult<
      undefined,
      RateAnswerError,
      RateAnswerVariables
    >);
    vi.mocked(useAuthStore).mockReturnValue({ token: null });
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it("renders answers correctly", () => {
    renderWithRouter(<Answers questionId={1} />);

    mockAnswers.forEach((answer) => {
      expect(screen.getByText(answer.content)).toBeInTheDocument();
      expect(screen.getByText(answer.author.name)).toBeInTheDocument();
      expect(screen.getByText(answer.rating.toString())).toBeInTheDocument();
    });
  });

  it("does not show vote buttons for unauthorized users", () => {
    renderWithRouter(<Answers questionId={1} />);

    expect(
      screen.queryByRole("button", { name: /upvote/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /downvote/i }),
    ).not.toBeInTheDocument();
  });

  it("shows vote buttons for authorized users", () => {
    vi.mocked(useAuthStore).mockReturnValue({ token: "mock-token" });

    renderWithRouter(<Answers questionId={1} />);

    expect(screen.getAllByRole("button", { name: /upvote/i })).toHaveLength(
      mockAnswers.length,
    );
    expect(screen.getAllByRole("button", { name: /downvote/i })).toHaveLength(
      mockAnswers.length,
    );
  });

  it("calls rateAnswer when authorized user votes", async () => {
    vi.mocked(useAuthStore).mockReturnValue({ token: "mock-token" });
    const mockRateAnswer = vi.fn();
    vi.mocked(useRateAnswer).mockReturnValue({
      mutateAsync: mockRateAnswer,
    } as unknown as UseMutationResult<
      undefined,
      RateAnswerError,
      RateAnswerVariables
    >);

    renderWithRouter(<Answers questionId={1} />);

    const upvoteButton = screen.getAllByRole("button", { name: /upvote/i })[0];
    fireEvent.click(upvoteButton);

    await waitFor(() => {
      expect(mockRateAnswer).toHaveBeenCalledWith({
        pathParams: { answerId: mockAnswers[0].id },
        body: { rating: 1 },
      });
    });
  });
});
