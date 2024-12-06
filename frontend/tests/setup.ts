/* eslint-disable @typescript-eslint/no-empty-object-type */
import "@testing-library/jest-dom/vitest";
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";
import { axe, AxeMatchers } from "vitest-axe";
import * as matchers from "vitest-axe/matchers";
expect.extend(matchers);

declare module "vitest" {
  interface Assertion<>extends AxeMatchers {}
  // @ts-expect-error vitest-axe types are not fully compatible with our version of vitest
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

// test file
const observeFn = vi.fn();
const unobserveFn = vi.fn();
class MockObserver {
  constructor() {
    // fn(entries, this);
  }

  disconnect() {}
  observe() {
    observeFn();
  }
  unobserve() {
    unobserveFn();
  }
}

// https://github.com/radix-ui/primitives/issues/420#issuecomment-771615182
// @ts-expect-error PointerEvent is not defined in the global scope
window.PointerEvent = class PointerEvent extends Event {
  button: number = 0;
  ctrlKey: boolean = false;

  constructor(type: string, props: { button?: number; ctrlKey?: boolean }) {
    super(type, props as EventInit);
    if (props.button != null) {
      this.button = props.button;
    }
    if (props.ctrlKey != null) {
      this.ctrlKey = props.ctrlKey;
    }
  }
};

// @ts-expect-error IntersectionObserver is not defined in the global scope
global.IntersectionObserver = MockObserver;

vi.mock("zustand/middleware", () => ({
  persist: (a: unknown) => a,
  createJSONStorage: () => null,
}));

afterEach(() => {
  cleanup();
});

// happy-dom doesn't support submit events on buttons, so we need to
// dispatch a submit event when a button is clicked
const originalDispatchEvent = HTMLElement.prototype.dispatchEvent;
HTMLElement.prototype.dispatchEvent = function (event): boolean {
  const result = originalDispatchEvent.call(this, event);

  if (
    event.type === "click" &&
    this.tagName === "BUTTON" &&
    this.getAttribute("type") === "submit"
  ) {
    this.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );
  }
  return result;
};

async function testAccessibility(ui: React.ReactElement) {
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

// function renderWithRouter(
//   ui: React.ReactElement,
//   { route = "/", ...renderOptions }: RenderOptions & { route?: string } = {},
// ) {
//   const router = createMemoryRouter(routeConfig, {
//     initialEntries: [route],
//   });

//   return {
//     ...render(<RouterProvider router={router} />, renderOptions),
//     testAccessibility: () =>
//       testAccessibility(<RouterProvider router={router} />),
//   };
// }

export { testAccessibility };

(globalThis as unknown as Record<string, boolean>).IS_REACT_ACT_ENVIRONMENT =
  true;
