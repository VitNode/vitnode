import { changeCodePluginToCapitalLetters } from "@/modules/admin/plugins/functions/change-code-plugin-to-capital-letters";

export const createModuleSchema = ({
  admin,
  code
}: {
  code: string;
  admin?: boolean;
}) => {
  const name = `${admin ? "Admin" : ""}${changeCodePluginToCapitalLetters(code)}`;

  return `import { Module } from '@nestjs/common';

@Module({})
export class ${name}Module {}
`;
};

export const createFunctionsDatabase = () => {
  return `// !! Do not remove and edit this file !!
import { default as tables } from './index';

export const getTables = () => {
  return Object.keys(tables);
};
`;
};
