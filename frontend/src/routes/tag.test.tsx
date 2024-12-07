//tag page integration test
import { useGetTagDetails } from "@/services/api/programmingForumComponents";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import TagPage from "./tag";

const mockTagData = vi.hoisted(
  () =>
    ({
      tagId: "1",
      name: "javascript",
      description:
        "A popular programming language primarily used for web development.",
      questionCount: 50,
      followerCount: 1000,
      logoImage: "https://example.com/logo.jpg",
      officialWebsite: "https://example.com",
      //createdAt: "2023-01-01T00:00:00Z",
    }) satisfies TagDetails,
);

// Mock the API hook
vi.mock("@/services/api/programmingForumComponents", () => ({
  useGetTagDetails: vi.fn(() => {}),
  useFollowTag: vi.fn(() => ({
    mutateAsync: vi.fn(), // Mock implementation of mutateAsync
  })),
  useUnfollowTag: vi.fn(() => ({
    mutateAsync: vi.fn(), // Mock implementation of mutateAsync
  })),
  useGetQuestionDetails: vi.fn(() => ({
    data: {
      data: {
        id: 1,
        author: {
          id: 1,
          username: "testuser",
          profilePicture: "test.jpg",
        },
      },
    },
    isLoading: false,
    error: null,
  })),
  useSearchQuestions: vi.fn(() => ({
    data: [],
    isLoading: false,
    error: null,
  })),
}));

// Mock the auth store
vi.mock("@/services/auth", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("TagPage", () => {
  beforeEach(() => {
    (useGetTagDetails as Mock).mockReturnValue({
      data: { data: mockTagData },
      isLoading: false,
      error: null,
    });
    vi.mocked(useAuthStore).mockReturnValue({
      selfProfile: null,
      token: null,
    });
  });

  it("renders tag details correctly", () => {
    render(
      <MemoryRouter initialEntries={["/tag/javascript"]}>
        <Routes>
          <Route path="/tag/:tagName" element={<TagPage />} />
        </Routes>
      </MemoryRouter>,
    );

    // Check if tag name is rendered
    expect(screen.getByText(mockTagData.name)).toBeInTheDocument();

    // Check if description is rendered
    expect(screen.getByText(mockTagData.description)).toBeInTheDocument();

    // Check if followers count is rendered
    expect(
      screen.getByText(`${mockTagData.followerCount}`, {
        exact: false,
      }),
    ).toBeInTheDocument();
  });

  it("renders 'Follow' button for authenticated users", () => {
    vi.mocked(useAuthStore).mockReturnValue({
      selfProfile: { id: 1, username: "testuser", profilePicture: "test.jpg" },
      token: "mock-token",
    });

     render(
       <MemoryRouter initialEntries={["/tag/javascript"]}>
         <Routes>
           <Route path="/tag/:tagName" element={<TagPage />} />
         </Routes>
       </MemoryRouter>,
     );

     expect(screen.getByRole("button", { name: /follow/i })).toBeInTheDocument();
   });
});
