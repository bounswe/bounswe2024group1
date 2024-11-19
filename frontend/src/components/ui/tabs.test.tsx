import { testAccessibility } from "@/utils/test-accessibility";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

describe("Tabs Accessibility", () => {
  const TabsExample = () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  );

  it("should have no accessibility violations", async () => {
    await testAccessibility(<TabsExample />);
  });

  it("should be keyboard navigable", async () => {
    const { unmount } = render(<TabsExample />);
    const tabs = screen.getAllByRole("tab");

    tabs[0].focus();
    expect(document.activeElement).toBe(tabs[0]);

    await userEvent.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(tabs[1]);

    await userEvent.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(tabs[0]);

    unmount();
  });

  it("should have proper ARIA attributes", () => {
    render(<TabsExample />);

    const tablist = screen.getByRole("tablist");
    expect(tablist).toHaveAttribute("aria-orientation", "horizontal");

    const tabs = screen.getAllByRole("tab");
    tabs.forEach((tab) => {
      expect(tab).toHaveAttribute("aria-selected");
      expect(tab).toHaveAttribute("aria-controls");
    });
  });
});
