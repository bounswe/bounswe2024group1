import { TagDetails } from "@/services/api/programmingForumSchemas";
import useAuthStore from "@/services/auth";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { Tag } from "./Tag";

// Mock the auth store
vi.mock("@/services/auth", () => ({
  default: vi.fn(),
}));

describe("Tag", () => {
  const mockTag = {
    tagId: "123",
    name: "JavaScript",
    logoImage: "javascript-logo.png",
    description: "A programming language",
  };

  it("renders tag information correctly", () => {
    vi.mocked(useAuthStore).mockReturnValue({ token: null });

    render(
      <MemoryRouter>
        <Tag tag={mockTag as TagDetails} />
      </MemoryRouter>,
    );

    expect(screen.getByText(mockTag.name!)).toBeInTheDocument();
    expect(screen.getByText(mockTag.description!)).toBeInTheDocument();
    expect(
      screen.getByAltText(`The logo image of ${mockTag.name}`),
    ).toHaveAttribute("src", mockTag.logoImage);
  });

  it("shows 'See all questions' link", () => {
    vi.mocked(useAuthStore).mockReturnValue({ token: null });

    render(
      <MemoryRouter>
        <Tag tag={mockTag as TagDetails} />
      </MemoryRouter>,
    );

    const link = screen.getByText(/see all questions/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/tag/${mockTag.tagId}`);
  });

  it("shows create question link when authenticated", () => {
    vi.mocked(useAuthStore).mockReturnValue({ token: "mock-token" });

    render(
      <MemoryRouter>
        <Tag tag={mockTag as TagDetails} />
      </MemoryRouter>,
    );

    const createLink = screen.getByRole("link", { name: /create question/i });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute(
      "href",
      `/questions/new?tagIds=${encodeURIComponent(mockTag.tagId)}`,
    );
  });

  it("does not show create question link when not authenticated", () => {
    vi.mocked(useAuthStore).mockReturnValue({ token: null });

    render(
      <MemoryRouter>
        <Tag tag={mockTag as TagDetails} />
      </MemoryRouter>,
    );

    const createLink = screen.queryByRole("link", { name: /create question/i });
    expect(createLink).not.toBeInTheDocument();
  });

  it("renders image with correct alt and title attributes", () => {
    vi.mocked(useAuthStore).mockReturnValue({ token: null });

    render(
      <MemoryRouter>
        <Tag tag={mockTag as TagDetails} />
      </MemoryRouter>,
    );

    const image = screen.getByAltText(`The logo image of ${mockTag.name}`);
    expect(image).toHaveAttribute(
      "title",
      `alt:The logo image of ${mockTag.name}`,
    );
    expect(image).toHaveClass(
      "h-full",
      "w-full",
      "rounded-2xl",
      "object-cover",
    );
  });
});
