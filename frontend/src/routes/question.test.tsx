import { useGetQuestionDetails, useSearchTags } from "@/services/api/programmingForumComponents";
import { QuestionDetails } from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { testAccessibility } from "@/utils/test-accessibility";
import { render, screen, fireEvent} from "@testing-library/react";
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
import { DifficultyBar } from "@/components/DifficultyBar";
import placeholderProfile from "@/assets/placeholder_profile.png";




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
        profilePicture: placeholderProfile,
      },
      likeCount: 10,
      commentCount: 5,
      tags: [
        { id: "1", name: "javascript" },
        { id: "2", name: "react" },
      ],
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
      dislikeCount: 0,
      difficulty: "EASY",
      bookmarked: false,
      selfVoted: 1,
      selfDifficultyVote: "EASY",
      easyCount: 5,
      mediumCount: 3,
      hardCount: 2,
    }) satisfies QuestionDetails,
);
// Mock the API hook
vi.mock("@/services/api/programmingForumComponents", () => ({
  useGetQuestionDetails: vi.fn(() => {}),
  useGetQuestionAnswers: vi.fn(() => ({ data: null, isLoading: true })),
  useDeleteQuestion: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useBookmarkQuestion: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useRemoveQuestionBookmark: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useVoteQuestion: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useUpvoteQuestion: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useDownvoteQuestion: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useUpvoteAnswer: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useDownvoteAnswer: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useCreateAnswer: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
  useRateQuestion: vi.fn(() => ({
    mutateAsync: vi.fn().mockResolvedValue({
      data: {
        easyCount: 0,
        mediumCount: 1,
        hardCount: 0,
        totalCount: 1,
      },
    }),
  })),
  useSearchTags: vi.fn(() => ({
    data: { data: { items: [{ tagId: "1", name: "Tag1" }, { tagId: "2", name: "Tag2" }] } },
    isLoading: false,
  })),
  useUpdateQuestion: vi.fn(() => ({
    mutateAsync: vi.fn().mockResolvedValue({
      data: { success: true },
    }),
    isPending: false,
  })),
}));

vi.mock("@/services/exercism", () => ({
  useExercismSearch: vi.fn(() => ({
    data: null,
    isLoading: true,
  })),
  convertTagToTrack: vi.fn(),
}));

// Mock the auth store
vi.mock("@/services/auth", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: vi.fn(),
}));

describe("QuestionPage", () => {
  beforeEach(() => {
    (useGetQuestionDetails as Mock).mockReturnValue({
      data: { data: mockQuestionData },
      isLoading: false,
      error: null,
    });
    (useSearchTags as Mock).mockReturnValue({
      data: { data: { items: [{ tagId: "1", name: "Tag1" }, { tagId: "2", name: "Tag2" }] } },
      isLoading: false,
    });
    vi.mocked(useAuthStore).mockReturnValue({
      selfProfile: { id: mockQuestionData.author.id }, // Ensure the user matches the question's author
      token: "mock-token",
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
      screen.getByText(mockQuestionData.likeCount.toString()),
    ).toBeInTheDocument();

    // Check if answer count is rendered
    expect(
      screen.getByText(mockQuestionData.commentCount.toString()),
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

  it("renders bookmark button", () => {
    vi.mocked(useAuthStore).mockReturnValue({
      selfProfile: { id: 1},
      token: "mock-token",
    });
    render(
      <MemoryRouter initialEntries={["/question/1"]}>
        <Routes>
          <Route path="/question/:questionId" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: /bookmark/i })).toBeInTheDocument();
  });

  it("updates difficulty counts when voting", async () => {
    // Mock the auth store with a logged-in user
    vi.mocked(useAuthStore).mockReturnValue({
      selfProfile: { id: 2 },
      token: "mock-token",
    });
  
    render(
      <MemoryRouter initialEntries={["/question/1"]}>
        <Routes>
          <Route
            path="/question/:questionId"
            element={
              <DifficultyBar
                questionId={1}
                easyCount={5}
                mediumCount={3}
                hardCount={2}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );
  
    // Simulate a vote on "Medium"
    const mediumButton = screen.getByText("Medium");
    fireEvent.click(mediumButton);
  
    // Verify the button is disabled after voting
    expect(await screen.findByText("Easy: 0 votes")).toBeInTheDocument();
    expect(await screen.findByText("Medium: 1 votes")).toBeInTheDocument();
    expect(await screen.findByText("Hard: 0 votes")).toBeInTheDocument();

  });
  
  
});
