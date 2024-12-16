import { routeConfig } from "@/routes";
import {
  useGetUserProfile,
  useUpdateUserProfile,
} from "@/services/api/programmingForumComponents";
import useAuthStore from "@/services/auth";
import { testAccessibility } from "@/utils/test-accessibility";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/api/programmingForumComponents", () => ({
  useGetUserProfile: vi.fn(),
  useUpdateUserProfile: vi.fn(() => ({
    mutateAsync: vi.fn(),
    isPending: false,
  })),
}));

describe("Profile component", () => {
  afterEach(async () => {
    await act(() => {
      useAuthStore.setState(useAuthStore.getInitialState());
      vi.clearAllMocks();
    });
  });

  it("should have no accessibility violations", async () => {
    // Arrange
    const router = createMemoryRouter(routeConfig, {
      initialEntries: ["/users/1"],
    });

    await testAccessibility(<RouterProvider router={router} />);
  });
  it("renders loading state", () => {
    (useGetUserProfile as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
      refetch: vi.fn(),
    });

    const router = createMemoryRouter(routeConfig, {
      initialEntries: ["/users/me"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays user data correctly", async () => {
    (useGetUserProfile as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          username: "john_doe",
          questionCount: 10,
          answerCount: 5,
          followersCount: 50,
          followingCount: 30,
          reputationPoints: 75,
          bio: "This is John's bio",
          country: "US",
        },
      },
      error: null,
      refetch: vi.fn(),
    });

    const router = createMemoryRouter(routeConfig, {
      initialEntries: ["/users/me"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText("john_doe")).toBeInTheDocument();
    expect(screen.getByText("This is John's bio")).toBeInTheDocument();
    // temporarily removed since missing from backend
    // expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();
    expect(screen.getAllByText("Questions").length).toBeGreaterThan(1);
    expect(screen.getAllByText("Answers").length).toBeGreaterThan(1);
  });

  it("allows editing and updating profile", async () => {
    useAuthStore.setState({
      token: "token",
      selfProfile: { id: 1 },
    });
    (useGetUserProfile as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          username: "john_doe",
          questionCount: 10,
          answerCount: 5,
          followersCount: 50,
          followingCount: 30,
          bio: "This is John's bio",
          country: "US",
          id: 1,
        },
      },
      error: null,
      refetch: vi.fn(),
    });

    const mockMutateAsync = vi.fn();
    (useUpdateUserProfile as ReturnType<typeof vi.fn>).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    const router = createMemoryRouter(routeConfig, {
      initialEntries: ["/users/me"],
    });

    render(<RouterProvider router={router} />);

    const editButton = screen.getByText("Edit Profile");
    fireEvent.click(editButton);

    const bioField = screen.getByPlaceholderText("Bio");
    fireEvent.change(bioField, { target: { value: "Updated bio" } });

    const countryField = screen.getByPlaceholderText("Country");
    fireEvent.change(countryField, { target: { value: "Canada" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        pathParams: { userId: 1 },
        body: {
          username: "john_doe",
          questionCount: 10,
          answerCount: 5,
          followersCount: 50,
          followingCount: 30,
          id: 1,
          bio: "Updated bio",
          country: "Canada",
        },
      });
    });
  });

  it("shows error message on profile fetch error", () => {
    (useGetUserProfile as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      data: null,
      error: {
        status: 500,
        payload: {
          status: 500,
          error: { errorMessage: "Failed to fetch profile", stackTrace: "" },
        },
      },
      refetch: vi.fn(),
    });

    const router = createMemoryRouter(routeConfig, {
      initialEntries: ["/users/me"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText("Failed to fetch profile")).toBeInTheDocument();
  });
});
