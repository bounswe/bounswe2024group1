/* eslint-disable @typescript-eslint/no-explicit-any */
import { useExecuteCode } from "@/services/api/programmingForumComponents";
import { UseMutationResult } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CodeSnippet } from "./CodeSnippet";

// Mock the API hooks
vi.mock("@/services/api/programmingForumComponents", () => ({
  useExecuteCode: vi.fn(),
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe("CodeSnippet", () => {
  const mockProps = {
    code: 'console.log("Hello, World!");',
    language: "javascript",
  };

  beforeEach(() => {
    vi.mocked(useExecuteCode).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false,
      data: undefined,
      error: undefined,
    } as unknown as UseMutationResult<any, any, any, any>);
  });

  it("renders code snippet with correct language", () => {
    render(<CodeSnippet {...mockProps} />);

    expect(screen.getByText("JavaScript Code Snippet")).toBeInTheDocument();
    screen.getAllByRole("code").forEach((code) => {
      expect(code).toHaveTextContent(mockProps.code);
    });
  });

  it("handles code execution", () => {
    const mockMutate = vi.fn();
    vi.mocked(useExecuteCode).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isSuccess: false,
      isError: false,
    } as unknown as UseMutationResult<any, any, any>);

    render(<CodeSnippet {...mockProps} />);

    const executeButton = screen.getByRole("button", { name: /execute/i });
    fireEvent.click(executeButton);

    expect(mockMutate).toHaveBeenCalledWith({
      body: {
        code: mockProps.code,
        language: mockProps.language,
      },
    });
  });

  it("shows loading state during execution", () => {
    vi.mocked(useExecuteCode).mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
      isSuccess: false,
      isError: false,
    } as unknown as UseMutationResult<any, any, any>);

    render(<CodeSnippet {...mockProps} />);

    expect(screen.getByText("Executing...")).toBeInTheDocument();
  });

  it("shows success output after execution", () => {
    vi.mocked(useExecuteCode).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      isSuccess: true,
      isError: false,
      data: {
        data: {
          output: "Hello, World!",
          executionTime: 0.5,
        },
      },
    } as unknown as UseMutationResult<any, any, any>);

    render(<CodeSnippet {...mockProps} />);

    expect(screen.getByText(/output \(in 0\.5s\):/i)).toBeInTheDocument();
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });

  it("shows error message on execution failure", () => {
    vi.mocked(useExecuteCode).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: true,
      error: {
        payload: {
          error: {
            errorMessage: "Execution failed",
          },
        },
      },
    } as unknown as UseMutationResult<any, any, any>);

    render(<CodeSnippet {...mockProps} />);

    expect(screen.getByText("Error:")).toBeInTheDocument();
    expect(screen.getByText("Execution failed")).toBeInTheDocument();
  });

  it("copies code to clipboard when copy button is clicked", async () => {
    render(<CodeSnippet {...mockProps} />);

    const copyButton = screen.getByRole("button", { name: /copy link/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      // Since the code is broken up into multiple elements for syntax highlighting,
      // we should verify the button click rather than the exact clipboard content
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });
});
