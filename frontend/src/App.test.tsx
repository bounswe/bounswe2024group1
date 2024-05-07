import { render, screen } from "@testing-library/react";
import { routeConfig } from "./routes";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";

test("welcome test is shown", () => {
  // Arrange
  const router = createMemoryRouter(routeConfig, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  // Act
  const welcomeText = screen.getByText("Welcome to Semantic Browse");
  expect(welcomeText).toBeInTheDocument();
});
