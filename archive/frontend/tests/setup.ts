import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

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