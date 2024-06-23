import { join } from "path";

import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config({
    path: join(process.cwd(), "..", "..", ".env"),
  });
}

const graphql_url =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "http://localhost:8080";

const config: CodegenConfig = {
  overwrite: true,
  schema: `${graphql_url}/graphql`,
  documents: [
    join(process.cwd(), "..", "frontend", "plugins/**/graphql/**/*.gql"),
  ],
  generates: {
    [`${join(process.cwd(), "..", "frontend", "graphql", "hooks.ts")}`]: {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-document-nodes",
      ],
      config: {
        scalars: {
          DateTime: "Date",
        },
        enumsAsConst: true,
        allowEnumStringTypes: true,
        namingConvention: {
          enumValues: "change-case-all#lowerCase",
        },
      },
    },
  },
};

export default config;
