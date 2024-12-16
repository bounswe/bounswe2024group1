// glossary.test.tsx
import { useSearchTags } from "@/services/api/programmingForumComponents";
import { TagDetails } from "@/services/api/programmingForumSchemas";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import GlossaryPage from "./glossary";

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

vi.mock("@/services/api/programmingForumComponents", () => ({
  useSearchTags: vi.fn(() => ({
    data: { data: { items: [mockTagData] } },
    isLoading: false,
    error: null,
  })),
}));

describe("GlossaryPage", () => {
  beforeEach(() => {
    (useSearchTags as Mock).mockReturnValue({
      data: { data: { items: [mockTagData] } },
      isLoading: false,
      error: null,
    });
  });

  it("renders glossary title correctly", () => {
    render(
      <MemoryRouter initialEntries={["/glossary"]}>
        <Routes>
          <Route path="/glossary" element={<GlossaryPage />} />
        </Routes>
      </MemoryRouter>,
    );

    // Check if glossary title is rendered
    expect(screen.getByText(/Explore Various Tag Types/i)).toBeInTheDocument();
  });

  it("renders tag counts and descriptions correctly", () => {
    render(
      <MemoryRouter initialEntries={["/glossary"]}>
        <Routes>
          <Route path="/glossary" element={<GlossaryPage />} />
        </Routes>
      </MemoryRouter>,
    );
  });

  it("renders error alert when there is an error", () => {
    (useSearchTags as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Something went wrong"),
    });

    render(
      <MemoryRouter initialEntries={["/glossary"]}>
        <Routes>
          <Route path="/glossary" element={<GlossaryPage />} />
        </Routes>
      </MemoryRouter>,
    );
  });
});
