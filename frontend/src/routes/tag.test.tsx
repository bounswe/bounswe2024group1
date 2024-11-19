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
      id: "1",
      name: "javascript",
      description:
        "A popular programming language primarily used for web development.",
      questionCount: 50,
      followersCount: 1000,
      //createdAt: "2023-01-01T00:00:00Z",
    }) satisfies TagDetails,
);

// Mock the API hook
vi.mock("@/services/api/programmingForumComponents", () => ({
  useGetTagDetails: vi.fn(() => {}),
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

    // Check if question count is rendered
    expect(
      screen.getByText(`${mockTagData.questionCount} Questions`, {
        exact: false,
      }),
    ).toBeInTheDocument();

    // Check if followers count is rendered
    expect(
      screen.getByText(`${mockTagData.followersCount} Followers`, {
        exact: false,
      }),
    ).toBeInTheDocument();
  });

  it("does not render 'Follow' button for unauthenticated users", () => {
    render(
      <MemoryRouter initialEntries={["/tag/javascript"]}>
        <Routes>
          <Route path="/tag/:tagName" element={<TagPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.queryByRole("button", { name: /follow/i }),
    ).not.toBeInTheDocument();
  });

  it("renders 'Follow' button for authenticated users", () => {
    vi.mocked(useAuthStore).mockReturnValue({
      selfProfile: { id: 1, username: "testuser" },
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
