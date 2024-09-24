import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: ["./tests/setup.ts"],
      globals: true,
      environment: "happy-dom",
    },
  }),
);
