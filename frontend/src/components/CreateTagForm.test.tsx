import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateTagForm } from "./CreateTagForm"; // Import your component
import { useCreateTag } from "@/services/api/programmingForumComponents"; // Import the hook

// Mock the useCreateTag hook
vi.mock("@/services/api/programmingForumComponents", () => ({
  useCreateTag: vi.fn(),
}));

describe("CreateTagForm", () => {
  const mockCreateTag = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useCreateTag).mockReturnValue({
      mutateAsync: mockCreateTag,
      isPending: false,
    } as unknown as ReturnType<typeof useCreateTag>);
  });

  it("renders form elements correctly", () => {
    render(<CreateTagForm />);

    // Check for presence of form fields
    expect(screen.getByPlaceholderText("Tag name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tag description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Tag" }),
    ).toBeInTheDocument();
  });

  it("submits form with valid data when 'Create Tag' is clicked", async () => {
    render(<CreateTagForm />);

    const nameInput = screen.getByPlaceholderText("Tag name");
    const descriptionInput = screen.getByPlaceholderText("Tag description");
    const submitButton = screen.getByRole("button", { name: "Create Tag" });

    // Simulate user input
    fireEvent.change(nameInput, { target: { value: "NewTag" } });
    fireEvent.change(descriptionInput, {
      target: { value: "A description for NewTag" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      // Check if the createTag function was called with the correct arguments
      expect(mockCreateTag).toHaveBeenCalledWith({
        body: {
          name: "NewTag",
          description: "A description for NewTag",
        },
      });
    });
  });

  it("disables submit button when form is empty", () => {
    render(<CreateTagForm />);

    const submitButton = screen.getByRole("button", { name: "Create Tag" });

    // Initially, the submit button should be disabled
    expect(submitButton).toBeDisabled();

    // Simulate filling the form
    fireEvent.change(screen.getByPlaceholderText("Tag name"), {
      target: { value: "NewTag" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tag description"), {
      target: { value: "Description" },
    });

    // The submit button should be enabled now
    expect(submitButton).not.toBeDisabled();
  });

  it("shows loading state while creating the tag", async () => {
    vi.mocked(useCreateTag).mockReturnValue({
      mutateAsync: mockCreateTag,
      isPending: true, // Simulate loading state
    } as unknown as ReturnType<typeof useCreateTag>);

    render(<CreateTagForm />);

    // Wait for the button text to change to "Creating..."
    const submitButton = await screen.findByRole("button", {
      name: /Create Tag|Creating.../,
    });

    // The button should display "Creating..." and be disabled
    expect(submitButton).toHaveTextContent("Creating...");
    expect(submitButton).toBeDisabled();
  });

  it("clears form inputs after successful submission", async () => {
    render(<CreateTagForm />);

    const nameInput = screen.getByPlaceholderText("Tag name");
    const descriptionInput = screen.getByPlaceholderText("Tag description");
    const submitButton = screen.getByRole("button", { name: "Create Tag" });

    fireEvent.change(nameInput, { target: { value: "NewTag" } });
    fireEvent.change(descriptionInput, { target: { value: "Description" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      // After form submission, inputs should be cleared
      expect(nameInput).toHaveValue("");
      expect(descriptionInput).toHaveValue("");
    });
  });

  it("does not submit if fields are empty", async () => {
    render(<CreateTagForm />);

    const nameInput = screen.getByPlaceholderText("Tag name");
    const descriptionInput = screen.getByPlaceholderText("Tag description");
    const submitButton = screen.getByRole("button", { name: "Create Tag" });

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(descriptionInput, { target: { value: "" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      // The submit function should not be called because inputs are empty
      expect(mockCreateTag).not.toHaveBeenCalled();
    });
  });
});
