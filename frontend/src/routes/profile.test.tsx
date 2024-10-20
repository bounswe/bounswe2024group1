import {
    useGetUserProfile,
    useUpdateUserProfile,
  } from "@/services/api/programmingForumComponents";
  import useAuthStore from "@/services/auth";
  import { Profile } from "./profile";
  import { createMemoryRouter, RouterProvider } from "react-router-dom";
  import { routeConfig } from "@/routes"; 
  import { render, screen, waitFor, fireEvent } from "@testing-library/react";
  import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
  
  vi.mock("@/services/api/programmingForumComponents", () => ({
    useGetUserProfile: vi.fn(),
    useUpdateUserProfile: vi.fn(),
  }));
  
  vi.mock("@/services/auth", () => ({
    default: {
      setState: vi.fn(),
      getInitialState: vi.fn(),
    },
  }));
  
  describe("Profile component", () => {
    afterEach(() => {
      useAuthStore.setState(useAuthStore.getInitialState());
      vi.clearAllMocks(); 
    });
  
    it("renders loading state", () => {
      (useGetUserProfile as ReturnType<typeof vi.fn>).mockReturnValue({
        isLoading: true,
        data: null,
        error: null,
        refetch: vi.fn(),
      });
  
      const router = createMemoryRouter(routeConfig, {
        initialEntries: ["/profile/me"],
      });
  
      render(<RouterProvider router={router} />);
  
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument(); 
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
            bio: "This is John's bio",
            country: "US",
          },
        },
        error: null,
        refetch: vi.fn(),
      });
  
      const router = createMemoryRouter(routeConfig, {
        initialEntries: ["/profile/me"],
      });
  
      render(<RouterProvider router={router} />);
  
      expect(screen.getByText("john_doe")).toBeInTheDocument();
      expect(screen.getByText("This is John's bio")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument(); 
      expect(screen.getByText("5")).toBeInTheDocument();  
      expect(screen.getByText("50")).toBeInTheDocument(); 
      expect(screen.getByText("30")).toBeInTheDocument();
      expect(screen.getByText("Questions")).toBeInTheDocument();
      expect(screen.getByText("Answers")).toBeInTheDocument();
    });
  
    it("allows editing and updating profile", async () => {
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
        initialEntries: ["/profile/me"],
      });
  
      render(<RouterProvider router={router} />);
  
      const editButton = screen.getByText("Edit profile");
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
        error: new Error("Failed to fetch profile"),
        refetch: vi.fn(),
      });
  
      const router = createMemoryRouter(routeConfig, {
        initialEntries: ["/profile/me"],
      });
  
      render(<RouterProvider router={router} />);
  
      expect(screen.getByText("Failed to fetch profile")).toBeInTheDocument();
    });
  });
  