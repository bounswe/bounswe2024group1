import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { routeConfig } from "../routes";
import { expect, test, vi } from "vitest";

vi.mock("@/services/search", () => {
  return {
    searchDishes: () => Promise.resolve([]),
  };
});

test("searching something goes to /search", async () => {
  // Arrange
  const router = createMemoryRouter(routeConfig, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  // Act
  const search = screen.getAllByPlaceholderText("Search for dishes...")[0];
  fireEvent.change(search, { target: { value: "hello" } });
  const button = screen.getAllByText("Search")[0];
  fireEvent.click(button);

  // Assert
  await waitFor(() => {
    expect(router.state.location.pathname).toBe("/search");
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