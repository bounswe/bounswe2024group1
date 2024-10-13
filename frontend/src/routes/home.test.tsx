import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { routeConfig } from "../routes";
import { expect, test, vi } from "vitest";

vi.mock("@/services/api/programmingForumComponents", async (importOriginal) => {
  const mod =
    await importOriginal<
      typeof import("@/services/api/programmingForumComponents")
    >();
  return {
    ...mod,
  };
});

test("home route renders", async () => {
  // Arrange
  const router = createMemoryRouter(routeConfig, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  // Act
  await waitFor(() => {
    // Assert
    expect(screen.getByText("Programming Languages Forum")).toBeInTheDocument();
  });
});

// test("log in button goes to /login", async () => {
//   // Arrange
//   const router = createMemoryRouter(routeConfig, {
//     initialEntries: ["/"],
//   });

//   render(<RouterProvider router={router} />);

//   // Act
//   const button = screen.getAllByText("Log in");
//   fireEvent.click(button[0]);

//   // Assert
//   await waitFor(() => {
//     expect(router.state.location.pathname).toBe("/login");
//   });
// });
