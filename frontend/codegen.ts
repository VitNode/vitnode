import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://[::1]:8080/graphql",
  documents: ["graphql/**/*.gql"],
  generates: {
    "graphql/hooks.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-document-nodes"
      ],
      config: {
        scalars: {
          DateTime: "Date"
        },
        enumsAsConst: true,
        allowEnumStringTypes: true,
        namingConvention: {
          enumValues: "change-case-all#lowerCase"
        }
      }
    }
  }
};

export default config;
