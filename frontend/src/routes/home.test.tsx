import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { routeConfig } from "../routes";
import { expect, test, vi } from "vitest";

vi.mock("@/services/search", () => {
  return {
    searchDishes: () => Promise.resolve([]),
  };
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
