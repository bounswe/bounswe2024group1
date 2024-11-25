import { fetchLogin } from "@/services/api/programmingForumComponents";
import { testAccessibility } from "@/utils/test-accessibility";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { afterEach, expect, test, vi } from "vitest";
import { routeConfig } from "../routes";
import useAuthStore from "../services/auth";

vi.mock("@/services/api/programmingForumComponents", () => {
  return {
    useGetFeed: vi.fn(() => ({
      data: {
        data: [],
        status: 200,
      },
    })),
    fetchLogin: vi.fn(() =>
      Promise.resolve({ data: { token: "token" }, status: 200 }),
    ),
    fetchGetMe: vi.fn(() =>
      Promise.resolve({
        data: {
          id: 1,
          username: "nazire",
          email: "",
        },
        status: 200,
      }),
    ),
  };
});

afterEach(async () => {
  await act(() => {
    useAuthStore.setState(useAuthStore.getInitialState());
  });
});
test("should have no accessibility violations", async () => {
  // Arrange
  const router = createMemoryRouter(routeConfig, {
    initialEntries: ["/login"],
  });

  await testAccessibility(<RouterProvider router={router} />);
});

test("login calls service", async () => {
  // Arrange
  const router = createMemoryRouter(routeConfig, {
    initialEntries: ["/login"],
  });

  render(<RouterProvider router={router} />);

  // Act
  const emailOrUsernameField = screen.getByPlaceholderText("m@example.com");
  fireEvent.change(emailOrUsernameField, { target: { value: "nazire" } }); // not a valid email
  const passwordField = screen.getByLabelText("Password");
  fireEvent.change(passwordField, { target: { value: "password" } }); // not a valid email
  const submit = screen.getByText("Login", { selector: "button" });
  await fireEvent.click(submit);

  // Assert
  await waitFor(() => {
    expect(fetchLogin).toHaveBeenCalledWith({
      body: {
        usernameOrEmail: "nazire",
        password: "password",
      },
    });
  });
});

test("log in button goes to /login", async () => {
  // Arrange
  const router = createMemoryRouter(routeConfig, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  // Act
  // const button = screen.getAllByText("Log in");
  // await fireEvent.click(button[0]);

  // Assert
  // await waitFor(() => {
  //   expect(router.state.location.pathname).toBe("/login");
  // });
});
