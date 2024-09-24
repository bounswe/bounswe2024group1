import { render, screen } from "@testing-library/react";
import { routeConfig } from "./routes";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";

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
  };
});

test("welcome test is shown", () => {
  // Arrange
  const router = createMemoryRouter(routeConfig, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);

  // Act
  const welcomeText = screen.getByText("Welcome to Semantic Cuisines");
  expect(welcomeText).toBeInTheDocument();
});
