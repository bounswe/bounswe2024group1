import {
  DownvoteAnswerError,
  DownvoteAnswerVariables,
  GetQuestionAnswersError,
  GetQuestionAnswersResponse,
  UpvoteAnswerError,
  UpvoteAnswerVariables,
  useDownvoteAnswer,
  useGetQuestionAnswers,
  useUpvoteAnswer,
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
  useUpvoteAnswer: vi.fn(),
  useDownvoteAnswer: vi.fn(),
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
    upvoteCount: 5,
    downvoteCount: 0,
  },
  {
    id: 2,
    content: "This is answer 2",
    author: { username: "user2", name: "User Two" },
    createdAt: "2023-01-02T00:00:00Z",
    upvoteCount: 3,
    downvoteCount: 0,
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
    vi.mocked(useUpvoteAnswer).mockReturnValue({
      mutateAsync: vi.fn(),
    } as unknown as UseMutationResult<
      undefined,
      UpvoteAnswerError,
      UpvoteAnswerVariables
    >);

    vi.mocked(useDownvoteAnswer).mockReturnValue({
      mutateAsync: vi.fn(),
    } as unknown as UseMutationResult<
      undefined,
      DownvoteAnswerError,
      DownvoteAnswerVariables
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
      expect(
        screen.getByText(
          (answer.upvoteCount - answer.downvoteCount).toString(),
        ),
      ).toBeInTheDocument();
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

  it("calls upvoteAnswer when authorized user votes", async () => {
    vi.mocked(useAuthStore).mockReturnValue({ token: "mock-token" });
    const mockUpvoteAnswer = vi.fn();
    vi.mocked(useUpvoteAnswer).mockReturnValue({
      mutateAsync: mockUpvoteAnswer,
    } as unknown as UseMutationResult<
      undefined,
      UpvoteAnswerError,
      UpvoteAnswerVariables
    >);

    renderWithRouter(<Answers questionId={1} />);

    const upvoteButton = screen.getAllByRole("button", { name: /upvote/i })[0];
    fireEvent.click(upvoteButton);

    await waitFor(() => {
      expect(mockUpvoteAnswer).toHaveBeenCalledWith({
        pathParams: { answerId: mockAnswers[0].id },
      });
    });
  });
});
