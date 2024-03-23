import { changeCodePluginToCapitalLetters } from "@/plugins/core/admin/plugins/functions/change-code-plugin-to-capital-letters";

export const removeModuleFromRootSchema = ({
  code,
  content
}: {
  code: string;
  content: string;
}) => {
  const name = changeCodePluginToCapitalLetters(code);

  return content
    .replace(`\n    ${name}Module`, "")
    .replace(`\nimport { ${name}Module } from "./${code}/${code}.module";`, "")
    .replace(`,\n    // ! === MODULE ===`, "\n    // ! === MODULE ===");
};

export const removeDatabaseFromService = ({
  code,
  content
}: {
  code: string;
  content: string;
}) => {
  const name = changeCodePluginToCapitalLetters(code);

  return content
    .replace(`\n  ...table${name}`, "")
    .replace(
      `\nimport table${name} from "../${code}/admin/database/index";`,
      ""
    )
    .replace(`,\n  // ! === MODULE ===`, "\n  // ! === MODULE ===");
};
