import { changeCodePluginToCapitalLetters } from "@/modules/admin/plugins/functions/change-code-plugin-to-capital-letters";

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
