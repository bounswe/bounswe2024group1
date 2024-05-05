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
  screen.debug(search);
  fireEvent.change(search, { target: { value: "hello" } });

  const button = screen.getAllByRole("button", { name: /search/i })[0];
  screen.debug(button);
  fireEvent.click(button);

  // Assert
  await waitFor(() => {
    expect(router.state.location.pathname).toBe("/search");
  });
});
