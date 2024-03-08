import { changeCodePluginToCapitalLetters } from "@/modules/core/admin/plugins/functions/change-code-plugin-to-capital-letters";
import { CreateAdminPluginsArgs } from "../../../create/dto/create.args";

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
  return `// !! Do not remove and edit this file !!
import { default as tables } from "./index";

export const getTables = () => {
  return Object.keys(tables);
};
`;
};

export const createInfoJSON = ({
  author,
  author_url,
  code,
  description,
  name,
  support_url
}: CreateAdminPluginsArgs): string => {
  const json = {
    name,
    description,
    code,
    author,
    author_url,
    support_url
  };

  return JSON.stringify(json, null, 2);
};
