import { changeCodePluginToCapitalLetters } from "@/src/admin/core/plugins/functions/change-code-plugin-to-capital-letters";

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

export const changeModuleRootSchema = ({
  admin,
  code,
  content
}: {
  code: string;
  content: string;
  admin?: boolean;
}) => {
  const name = `${admin ? "Admin" : ""}${changeCodePluginToCapitalLetters(code)}`;

  return content
    .replace(
      "// ! === IMPORT ===",
      `import { ${name}Module } from './${code}/${code}.module';\n// ! === IMPORT ===`
    )
    .replace(
      "\n    // ! === MODULE ===",
      `,\n    ${name}Module\n    // ! === MODULE ===`
    );
};

export const changeDatabaseService = ({
  admin,
  code,
  content
}: {
  code: string;
  content: string;
  admin?: boolean;
}) => {
  const name = `${admin ? "Admin" : ""}${changeCodePluginToCapitalLetters(code)}`;

  return content
    .replace(
      "// ! === IMPORT ===",
      `import table${name} from '../src/admin/${code}/database/index';\n// ! === IMPORT ===`
    )
    .replace(
      "\n  // ! === MODULE ===",
      `,\n  ...table${name}\n  // ! === MODULE ===`
    );
};

export const createFunctionsDatabase = () => {
  return `// !! Do not remove and edit this file !!
import { default as tables } from './index';

export const getTables = () => {
  return Object.keys(tables);
};
`;
};
