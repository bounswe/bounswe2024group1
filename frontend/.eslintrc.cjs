module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    // auto-generated files are ignored
    "src/services/api/semanticBrowseResponses.ts",
    "src/services/api/semanticBrowseComponents.ts",
    "src/services/api/semanticBrowseSchemas.ts",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "off",
      { allowConstantExport: true },
    ],
  },
};
