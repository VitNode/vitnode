import { PluginInfoJSONType } from "../../../../../../providers/plugins.type";
import { changeCodePluginToCapitalLetters } from "../../change-code-plugin-to-capital-letters";

export const createModuleSchema = ({ code }: { code: string }) => {
  const name = changeCodePluginToCapitalLetters(code);

  return `import { Module } from "@nestjs/common";

import { Admin${name}Module } from "./admin/admin.module";

@Module({
  imports: [Admin${name}Module]
})
export class ${name}Module {}
`;
};

export const createModuleAdminSchema = ({ code }: { code: string }) => {
  const name = changeCodePluginToCapitalLetters(code);

  return `import { Module } from "@nestjs/common";

@Module({})
export class Admin${name}Module {}
`;
};

export const createFunctionsDatabase = () => {
  return `// ! DO NOT REMOVE OR MODIFY THIS FILE!!!
import { default as tables } from "./index";

export const getTables = () => {
  return Object.keys(tables);
};
`;
};

export const createConfigForDrizzle = ({ code }: { code: string }) => {
  return `// ! DO NOT REMOVE OR MODIFY THIS FILE!!!
import { defineConfig } from "drizzle-kit";

import { DATABASE_ENVS } from "@/database/client";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: DATABASE_ENVS,
  schema: "./plugins/${code}/admin/database/schema/*.ts",
  out: "./plugins/${code}/admin/database/migrations/"
});
`;
};

export const createInfoJSON = ({
  allow_default,
  author,
  author_url,
  code,
  description,
  name,
  nav,
  support_url
}: PluginInfoJSONType): string => {
  const json = {
    name,
    description,
    code,
    author,
    author_url,
    support_url,
    allow_default,
    nav
  };

  return JSON.stringify(json, null, 2);
};
