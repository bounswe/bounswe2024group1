import { useGetQuestionDetails } from "@/services/api/programmingForumComponents";
import { QuestionDetails } from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { testAccessibility } from "@/utils/test-accessibility";
import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  MemoryRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { routeConfig } from ".";
import QuestionPage from "./question";

const mockQuestionData = vi.hoisted(
  () =>
    ({
      id: 1,
      title: "Test Question",
      content: "This is a test question content",
      author: {
        id: 1,
        username: "johndoe",
        name: "John Doe",
        reputationPoints: 100,
        profilePicture: "https://example.com/profile.jpg",
      },
      rating: 10,
      answerCount: 5,
      tags: [
        { id: "1", name: "javascript" },
        { id: "2", name: "react" },
      ],
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
    }) satisfies QuestionDetails,
);
// Mock the API hook
vi.mock("@/services/api/programmingForumComponents", () => ({
  useGetQuestionDetails: vi.fn(() => {}),
  useGetQuestionAnswers: vi.fn(() => ({ data: null, isLoading: true })),
  useDeleteQuestion: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useVoteQuestion: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useRateQuestion: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useRateAnswer: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
}));

// Mock the auth store
vi.mock("@/services/auth", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("QuestionPage", () => {
  beforeEach(() => {
    (useGetQuestionDetails as Mock).mockReturnValue({
      data: { data: mockQuestionData },
      isLoading: false,
      error: null,
    });
    vi.mocked(useAuthStore).mockReturnValue({
      selfProfile: null,
      token: null,
    });
  });

  it("should have no accessibility violations", async () => {
    // Arrange
    const router = createMemoryRouter(routeConfig, {
      initialEntries: ["/question/1"],
    });

    await testAccessibility(<RouterProvider router={router} />);
  });

  it("renders question details correctly", () => {
    render(
      <MemoryRouter initialEntries={["/question/1"]}>
        <Routes>
          <Route path="/question/:questionId" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>,
    );

    // Check if title is rendered
    expect(screen.getByText(mockQuestionData.title)).toBeInTheDocument();

    // Check if author name is rendered
    expect(screen.getByText(mockQuestionData.author.name)).toBeInTheDocument();

    // Check if rating is rendered
    expect(
      screen.getByText(mockQuestionData.rating.toString()),
    ).toBeInTheDocument();

    // Check if answer count is rendered
    expect(
      screen.getByText(mockQuestionData.answerCount.toString()),
    ).toBeInTheDocument();

    // Check if tags are rendered
    mockQuestionData.tags.forEach((tag) => {
      expect(screen.getByText(tag.name, { exact: false })).toBeInTheDocument();
    });

    // Check if creation date is rendered
    expect(
      screen.getByText(
        new Date(mockQuestionData.createdAt).toLocaleDateString(),
        { exact: false },
      ),
    ).toBeInTheDocument();

    // Check if content is rendered
    expect(screen.getByText(mockQuestionData.content)).toBeInTheDocument();
  });

  it("does not render delete button for non-author", () => {
    render(
      <MemoryRouter initialEntries={["/question/1"]}>
        <Routes>
          <Route path="/question/:questionId" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  it("renders delete button for author", () => {
    vi.mocked(useAuthStore).mockReturnValue({
      selfProfile: { id: mockQuestionData.author.id },
      token: "mock-token",
    });

    render(
      <MemoryRouter initialEntries={["/question/1"]}>
        <Routes>
          <Route path="/question/:questionId" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });
});
