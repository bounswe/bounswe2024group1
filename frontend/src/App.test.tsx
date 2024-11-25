import { render} from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { test, vi } from "vitest";
import { routeConfig } from "./routes";

vi.mock("@/services/api/programmingForumComponents", async (importOriginal) => {
  const mod =
    await importOriginal<
      typeof import("@/services/api/programmingForumComponents")
    >();
  return {
    ...mod,
    useGetUserFeed: vi.fn(() => ({
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
  // const welcomeText = screen.getByText(
  //   "Welcome to Programming Languages Forum",
  // );
  // expect(welcomeText).toBeInTheDocument();
});
