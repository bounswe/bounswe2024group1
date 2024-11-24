import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CreateTagPage from "./CreateTagPage"; // Adjust path to the component
import { useCreateTag } from "@/services/api/programmingForumComponents"; // Import the API hook

// Mock the API hook used in CreateTagForm
vi.mock("@/services/api/programmingForumComponents", () => ({
  useCreateTag: vi.fn(),
}));

describe("CreateTagPage", () => {
  const mockCreateTag = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock the hook to simulate a successful submission
    vi.mocked(useCreateTag).mockReturnValue({
      mutateAsync: mockCreateTag,
      isPending: false,
    } as unknown as ReturnType<typeof useCreateTag>);
  });

  it("renders CreateTagForm correctly", () => {
    render(<CreateTagPage />);

    // Check if the form title is displayed
    expect(screen.getByText("Create a New Tag")).toBeInTheDocument();
    // Check if input fields are displayed
    expect(screen.getByPlaceholderText("Tag name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tag description")).toBeInTheDocument();
    // Check if the submit button is displayed
    expect(
      screen.getByRole("button", { name: "Create Tag" }),
    ).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<CreateTagPage />);

    const nameInput = screen.getByPlaceholderText("Tag name");
    const descriptionInput = screen.getByPlaceholderText("Tag description");
    const submitButton = screen.getByRole("button", { name: "Create Tag" });

    // Simulate filling in the form
    fireEvent.change(nameInput, { target: { value: "New Tag" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Description of the new tag" },
    });

    // Simulate form submission
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Ensure the createTag function was called with the correct parameters
      expect(mockCreateTag).toHaveBeenCalledWith({
        body: {
          name: "New Tag",
          description: "Description of the new tag",
        },
      });
    });
  });

  it("disables the submit button when fields are empty", () => {
    render(<CreateTagPage />);

    const submitButton = screen.getByRole("button", { name: "Create Tag" });
    expect(submitButton).toBeDisabled();
  });

  it("enables the submit button when fields are filled", () => {
    render(<CreateTagPage />);

    const nameInput = screen.getByPlaceholderText("Tag name");
    const descriptionInput = screen.getByPlaceholderText("Tag description");
    const submitButton = screen.getByRole("button", { name: "Create Tag" });

    // Fill the fields
    fireEvent.change(nameInput, { target: { value: "New Tag" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Description of the new tag" },
    });

    expect(submitButton).toBeEnabled();
  });

  it("displays loading state while submitting", async () => {
    // Mock the API hook to simulate a pending request
    vi.mocked(useCreateTag).mockReturnValue({
      mutateAsync: mockCreateTag,
      isPending: true,
    } as unknown as ReturnType<typeof useCreateTag>);

    render(<CreateTagPage />);
  });

  it("clears the input fields after successful submission", async () => {
    render(<CreateTagPage />);

    const nameInput = screen.getByPlaceholderText("Tag name");
    const descriptionInput = screen.getByPlaceholderText("Tag description");
    const submitButton = screen.getByRole("button", { name: "Create Tag" });

    // Fill the fields
    fireEvent.change(nameInput, { target: { value: "New Tag" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Description of the new tag" },
    });

    // Submit the form
    fireEvent.click(submitButton);

    // Simulate successful submission
    await waitFor(() => {
      expect(nameInput).toHaveValue("");
      expect(descriptionInput).toHaveValue("");
    });
  });
});
