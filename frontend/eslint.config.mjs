// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import react from "eslint-plugin-react";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // @ts-expect-error these types are wrong
  react.configs.flat["jsx-runtime"],
  eslintConfigPrettier,
  {
    ignores: [
      "dist",
      ".vite",
      ".eslintrc.cjs",
      // auto-generated files are ignored
      "src/services/api/programmingForumResponses.ts",
      "src/services/api/programmingForumComponents.ts",
      "src/services/api/programmingForumSchemas.ts",
    ],
  },
);
