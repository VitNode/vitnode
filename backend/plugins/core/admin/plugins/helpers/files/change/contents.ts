import { changeCodePluginToCapitalLetters } from "@/plugins/core/admin/plugins/functions/change-code-plugin-to-capital-letters";

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
      `import { ${name}Module } from "./${code}/${code}.module";\n// ! === IMPORT ===`
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
      `import table${name} from "../${code}/admin/database/index";\n// ! === IMPORT ===`
    )
    .replace(
      "\n  // ! === MODULE ===",
      `,\n  ...table${name}\n  // ! === MODULE ===`
    );
};
