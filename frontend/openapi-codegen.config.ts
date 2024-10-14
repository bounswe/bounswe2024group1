import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  programmingForum: {
    from: {
      relativePath: "../swagger/openapi.yml",
      source: "file",
    },
    outputDir: "./src/services/api",
    to: async (context) => {
      const filenamePrefix = "programmingForum";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
