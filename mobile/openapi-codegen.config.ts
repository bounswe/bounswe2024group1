import { defineConfig } from "@openapi-codegen/cli";
import {
  generateReactQueryComponents,
  generateSchemaTypes,
} from "@openapi-codegen/typescript";
export default defineConfig({
  programmingForum: {
    from: {
      relativePath: "../swagger/openapi.yml",
      source: "file",
    },
    outputDir: "./services/api",
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
