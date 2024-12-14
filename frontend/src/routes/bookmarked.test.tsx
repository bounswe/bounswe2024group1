import {
    GetBookmarkedQuestionsError,
    useGetBookmarkedQuestions,
  } from "@/services/api/programmingForumComponents";
  import { QuestionDetails } from "@/services/api/programmingForumSchemas";
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
  import { BookmarkedQuestions } from "./bookmarked";
  
  // Mock the useGetBookmarkedQuestions hook
  vi.mock("@/services/api/programmingForumComponents", () => ({
    useGetBookmarkedQuestions: vi.fn(),
  }));
  
  const mockQuestions: QuestionDetails[] = [
    {
      id: 1,
      title: "How to implement a binary tree in Python?",
      content: "I'm struggling to understand the structure...",
      author: { id: 1, name: "John Doe", username: "user1", profilePicture: "p", reputationPoints: 50},
      createdAt: "2024-12-01T12:00:00Z",
      updatedAt: "2024-12-01T12:30:00Z",
      tags: [{ id: "1", name: "Python" }],
      likeCount: 10,
      dislikeCount: 2,
      commentCount: 4,
      viewCount: 50,
      bookmarked: true,
      selfVoted: 1,
      selfDifficultyVote: "MEDIUM",
      easyCount: 5,
      mediumCount: 10,
      hardCount: 3,
    },
    {
      id: 2,
      title: "What are closures in JavaScript?",
      content: "Can someone explain closures with an example?",
      author: { id: 2, name: "Jane Smith", username: "user2", profilePicture: "p", reputationPoints: 50},
      createdAt: "2024-12-02T10:00:00Z",
      updatedAt: "2024-12-02T10:20:00Z",
      tags: [{ id: "2", name: "JavaScript" }],
      likeCount: 15,
      dislikeCount: 1,
      commentCount: 5,
      viewCount: 70,
      bookmarked: true,
      selfVoted: 0,
      selfDifficultyVote: "EASY",
      easyCount: 8,
      mediumCount: 6,
      hardCount: 1,
    },
  ];
  
  describe("BookmarkedQuestions component", () => {
    beforeEach(() => {
      vi.mocked(useGetBookmarkedQuestions).mockReset();
    });
  
    it("should have no accessibility violations", async () => {
      const router = createMemoryRouter(routeConfig, {
        initialEntries: ["/bookmarked"],
      });
  
      await testAccessibility(<RouterProvider router={router} />);
    });
  
    it("renders bookmarked questions correctly", () => {
      vi.mocked(useGetBookmarkedQuestions).mockReturnValue({
        isLoading: false,
        error: null,
        data: {
          data: { items: mockQuestions, totalItems: mockQuestions.length },
        },
      } as QueryObserverSuccessResult<unknown, GetBookmarkedQuestionsError>);
  
      render(
        <MemoryRouter initialEntries={["/bookmarked"]}>
          <Routes>
            <Route path="/bookmarked" element={<BookmarkedQuestions />} />
          </Routes>
        </MemoryRouter>,
      );
  
      expect(
        screen.getByText(`Last ${mockQuestions.length} bookmarked questions shown.`),
      ).toBeInTheDocument();
  
      mockQuestions.forEach((question) => {
        expect(screen.getByText(question.title)).toBeInTheDocument();
      });
    });
  });
  