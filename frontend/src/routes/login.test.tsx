import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { routeConfig } from "../routes";
import { afterEach, expect, test, vi } from "vitest";
import { fetchLogin } from "@/services/api/semanticBrowseComponents";
import useAuthStore from "../services/auth";

vi.mock("@/services/api/semanticBrowseComponents", async (importOriginal) => {
  const mod =
    await importOriginal<
      typeof import("@/services/api/semanticBrowseComponents")
    >();
  return {
    ...mod,
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
          username: "efe",
          email: "",
        },
        status: 200,
      }),
    ),
  };
});

afterEach(() => {
  useAuthStore.setState(useAuthStore.getInitialState());
});

test("login calls service", async () => {
  // Arrange
  const router = createMemoryRouter(routeConfig, {
    initialEntries: ["/login"],
  });

  render(<RouterProvider router={router} />);

  // Act
  const emailOrUsernameField = screen.getByPlaceholderText("m@example.com");
  fireEvent.change(emailOrUsernameField, { target: { value: "efe" } }); // not a valid email
  const passwordField = screen.getByLabelText("Password");
  fireEvent.change(passwordField, { target: { value: "password" } }); // not a valid email
  const submit = screen.getByText("Login", { selector: "button" });
  fireEvent.click(submit);

  // Assert
  await waitFor(() => {
    expect(fetchLogin).toHaveBeenCalledWith({
      body: {
        usernameOrEmail: "efe",
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
  const button = screen.getAllByText("Log in");
  fireEvent.click(button[0]);

  // Assert
  await waitFor(() => {
    expect(router.state.location.pathname).toBe("/login");
  });
});
