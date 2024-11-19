import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { axe } from "vitest-axe";

export const accessibilityChecks = {
  checkHeadingOrder: () => {
    const headings = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    );
    let previousLevel = 0;

    headings.forEach((heading) => {
      const currentLevel = parseInt(heading.tagName[1]);
      expect(currentLevel).toBeLessThanOrEqual(previousLevel + 1);
      previousLevel = currentLevel;
    });
  },

  checkInteractiveElements: () => {
    // Check buttons
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("aria-label");
    });

    // Check links
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAccessibleName();
    });
  },

  checkImages: () => {
    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
    });
  },

  checkFormControls: () => {
    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toHaveAccessibleName();
    });
  },
};

export async function testAccessibility(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  render(ui, { container });

  const results = await axe(container, {
    rules: {
      "color-contrast": { enabled: true },
      "html-has-lang": { enabled: true },
      "aria-roles": { enabled: true },
      "button-name": { enabled: true },
      "image-alt": { enabled: true },
      "link-name": { enabled: true },
    },
  });

  expect(results).toHaveNoViolations();
  document.body.removeChild(container);
}
