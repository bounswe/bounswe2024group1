import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { routeConfig } from "../routes";
import { expect, test, vi } from "vitest";
import { signin } from "@/services/auth";

vi.mock("@/services/auth", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@/services/auth")>();
  return {
    ...mod,
    signin: vi.fn(() => Promise.resolve("token")),
  };
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
    expect(signin).toHaveBeenCalledWith({
      usernameOrEmail: "efe",
      password: "password",
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
