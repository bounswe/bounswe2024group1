import { useCreateAnswer } from "@/services/api/programmingForumComponents";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateAnswerForm } from "./CreateAnswerForm";

// Mock the API hook
vi.mock("@/services/api/programmingForumComponents", () => ({
  useCreateAnswer: vi.fn(),
}));

describe("CreateAnswerForm", () => {
  const mockCreateAnswer = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useCreateAnswer).mockReturnValue({
      mutateAsync: mockCreateAnswer,
      isPending: false,
    } as unknown as ReturnType<typeof useCreateAnswer>);
  });

  it("renders form elements correctly", () => {
    render(<CreateAnswerForm questionId={1} />);

    expect(screen.getByText("Your Answer")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Write" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Preview" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Post Answer" }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Write your answer here/i),
    ).toBeInTheDocument();
  });

  it("toggles between write and preview modes", () => {
    render(<CreateAnswerForm questionId={1} />);

    const previewButton = screen.getByRole("button", { name: "Preview" });
    const writeButton = screen.getByRole("button", { name: "Write" });

    // Initially in write mode
    expect(screen.getByRole("textbox")).toBeInTheDocument();

    // Switch to preview mode
    fireEvent.click(previewButton);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();

    // Switch back to write mode
    fireEvent.click(writeButton);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("preview/write buttons do not submit the form", () => {
    render(<CreateAnswerForm questionId={1} />);

    const previewButton = screen.getByRole("button", { name: "Preview" });
    const writeButton = screen.getByRole("button", { name: "Write" });

    fireEvent.click(previewButton);
    fireEvent.click(writeButton);

    expect(mockCreateAnswer).not.toHaveBeenCalled();
  });

  it("submits form with content when Post Answer is clicked", async () => {
    render(<CreateAnswerForm questionId={1} />);

    const textarea = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: "Post Answer" });

    fireEvent.change(textarea, { target: { value: "Test answer content" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateAnswer).toHaveBeenCalledWith({
        pathParams: { questionId: 1 },
        body: { content: "Test answer content" },
      });
    });
  });

  it("disables submit button when content is empty", () => {
    render(<CreateAnswerForm questionId={1} />);

    const submitButton = screen.getByRole("button", { name: "Post Answer" });
    expect(submitButton).toBeDisabled();

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Test content" } });
    expect(submitButton).not.toBeDisabled();

    fireEvent.change(textarea, { target: { value: "" } });
    expect(submitButton).toBeDisabled();
  });

  it("shows loading state while submitting", async () => {
    vi.mocked(useCreateAnswer).mockReturnValue({
      mutateAsync: mockCreateAnswer,
      isPending: true,
    } as unknown as ReturnType<typeof useCreateAnswer>);

    render(<CreateAnswerForm questionId={1} />);

    expect(screen.getByRole("button", { name: "Posting..." })).toBeDisabled();
  });

  it("clears textarea after successful submission", async () => {
    render(<CreateAnswerForm questionId={1} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Test answer content" } });

    const submitButton = screen.getByRole("button", { name: "Post Answer" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(textarea).toHaveValue("");
    });
  });
});
