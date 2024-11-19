import { fetchSignUp } from "@/services/api/programmingForumComponents";
import useAuthStore from "@/services/auth";
import { testAccessibility } from "@/utils/test-accessibility";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { afterEach, expect, test, vi } from "vitest";
import { routeConfig } from ".";

vi.mock("@/services/api/programmingForumComponents", async (importOriginal) => {
  const mod =
    await importOriginal<
      typeof import("@/services/api/programmingForumComponents")
    >();
  vi.resetModules();
  return {
    ...mod,
    fetchSignUp: vi.fn(() => Promise.resolve({ token: "token" })),
  };
});

afterEach(() => {
  useAuthStore.setState(useAuthStore.getInitialState());
  vi.clearAllMocks();
});

test("should have no accessibility violations", async () => {
  // Arrange
  const router = createMemoryRouter(routeConfig, {
    initialEntries: ["/signup"],
  });

  await testAccessibility(<RouterProvider router={router} />);
});

test("signup calls service", async () => {
  // Arrange
  const router = createMemoryRouter(routeConfig, {
    initialEntries: ["/signup"],
  });

  render(<RouterProvider router={router} />);

  // Act
  const firstNameField = screen.getByPlaceholderText("John");
  fireEvent.change(firstNameField, { target: { value: "John" } });

  const lastNameField = screen.getByPlaceholderText("Doe");
  fireEvent.change(lastNameField, { target: { value: "Doe" } });

  const usernameField = screen.getByPlaceholderText("john_doe");
  fireEvent.change(usernameField, { target: { value: "john_doe" } });

  const emailField = screen.getByPlaceholderText("m@example.com");
  fireEvent.change(emailField, { target: { value: "m@example.com" } });

  const passwordField = screen.getByLabelText("Password");
  fireEvent.change(passwordField, { target: { value: "password" } });

  const countryField = screen.getByPlaceholderText("TR");
  fireEvent.change(countryField, { target: { value: "TR" } });

  const experienceLevelSelect = screen.getByRole("combobox");
  fireEvent.click(experienceLevelSelect);
  const beginnerOption = screen.getAllByText("Beginner");
  fireEvent.click(beginnerOption[1]);

  const submit = screen.getByText("Create an account", { selector: "button" });
  fireEvent.click(submit);

  // Assert
  await waitFor(() => {
    expect(fetchSignUp).toHaveBeenCalledWith({
      body: {
        username: "john_doe",
        email: "m@example.com",
        password: "password",
        firstName: "John",
        lastName: "Doe",
        country: "TR",
        experienceLevel: "BEGINNER",
      },
    });
  });
});

test("signup with invalid email shows validation error", async () => {
  const router = createMemoryRouter(routeConfig, {
    initialEntries: ["/signup"],
  });

  render(<RouterProvider router={router} />);

  // Act: Provide invalid email
  const firstNameField = screen.getByPlaceholderText("John");
  fireEvent.change(firstNameField, { target: { value: "John" } });

  const lastNameField = screen.getByPlaceholderText("Doe");
  fireEvent.change(lastNameField, { target: { value: "Doe" } });

  const usernameField = screen.getByPlaceholderText("john_doe");
  fireEvent.change(usernameField, { target: { value: "john_doe" } });

  const emailField = screen.getByPlaceholderText("m@example.com");
  fireEvent.change(emailField, { target: { value: "invalid-email" } });

  const passwordField = screen.getByLabelText("Password");
  fireEvent.change(passwordField, { target: { value: "password123" } });

  const countryField = screen.getByPlaceholderText("TR");
  fireEvent.change(countryField, { target: { value: "US" } });

  const experienceLevelSelect = screen.getByRole("combobox");
  fireEvent.click(experienceLevelSelect);
  const beginnerOption = screen.getAllByText("Beginner");
  fireEvent.click(beginnerOption[1]);

  const submit = screen.getByText("Create an account", { selector: "button" });
  fireEvent.click(submit);

  // Assert: Expect no service call to be made and validation message to show
  await waitFor(() => {
    expect(fetchSignUp).not.toHaveBeenCalled();
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });
});

test("signup with invalid password shows validation error", async () => {
  const router = createMemoryRouter(routeConfig, {
    initialEntries: ["/signup"],
  });

  render(<RouterProvider router={router} />);

  // Act: Provide invalid password
  const firstNameField = screen.getByPlaceholderText("John");
  fireEvent.change(firstNameField, { target: { value: "John" } });

  const lastNameField = screen.getByPlaceholderText("Doe");
  fireEvent.change(lastNameField, { target: { value: "Doe" } });

  const usernameField = screen.getByPlaceholderText("john_doe");
  fireEvent.change(usernameField, { target: { value: "john_doe" } });

  const emailField = screen.getByPlaceholderText("m@example.com");
  fireEvent.change(emailField, { target: { value: "john.doe@example.com" } });

  const passwordField = screen.getByLabelText("Password");
  fireEvent.change(passwordField, { target: { value: "123" } }); // Too short

  const countryField = screen.getByPlaceholderText("TR");
  fireEvent.change(countryField, { target: { value: "US" } });

  const experienceLevelSelect = screen.getByRole("combobox");
  fireEvent.click(experienceLevelSelect);
  const beginnerOption = screen.getAllByText("Beginner");
  fireEvent.click(beginnerOption[1]);

  const submit = screen.getByText("Create an account", { selector: "button" });
  fireEvent.click(submit);

  // Assert: Expect no service call and validation error message
  await waitFor(() => {
    expect(fetchSignUp).not.toHaveBeenCalled();
    expect(
      screen.getByText("String must contain at least 8 character(s)"),
    ).toBeInTheDocument();
  });
});
