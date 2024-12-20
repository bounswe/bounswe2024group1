import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        "#": "./",
      },
    },
    test: {
      setupFiles: ["./tests/setup.ts"],
      globals: true,
      environment: "jsdom",
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        exclude: [
          // defaults from vitest
          'coverage/**',
          'dist/**',
          '**/node_modules/**',
          '**/[.]**',
          'packages/*/test?(s)/**',
          '**/*.d.ts',
          '**/virtual:*',
          '**/__x00__*',
          '**/\x00*',
          'cypress/**',
          'test?(s)/**',
          'test?(-*).?(c|m)[jt]s?(x)',
          '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
          '**/__tests__/**',
          '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
          '**/vitest.{workspace,projects}.[jt]s?(on)',
          '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
          // these are automatically generated -- no need to test them
          "**/programmingForum{Schemas,Context,Components,Responses}.ts",
          "**/tests/setup.ts",
          // no need to test Shadcn components -- we don't modify them
          "**/components/ui/**",
          // can't test configs
          "**/*.config.?(c)[tj]s",
        ],
      },
    },
  }),
);
