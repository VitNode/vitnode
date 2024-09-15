import { changeCodePluginToCapitalLetters } from '../helpers/change-code-plugin-to-capital-letters';

export const removeModuleFromRootSchema = ({
  code,
  content,
}: {
  code: string;
  content: string;
}) => {
  const name = changeCodePluginToCapitalLetters(code);

  return content
    .replace(`\n    ${name}Module,`, '')
    .replace(`\nimport { ${name}Module } from './${code}/${code}.module';`, '')
    .replace(`\nimport { ${name}Module } from "./${code}/${code}.module";`, '');
};

export const removeDatabaseFromService = ({
  code,
  content,
}: {
  code: string;
  content: string;
}) => {
  const name = changeCodePluginToCapitalLetters(code);

  return content
    .replace(`\n  ...table${name},`, '')
    .replace(
      `\nimport table${name} from '@/plugins/${code}/admin/database/index';`,
      '',
    )
    .replace(
      `\nimport table${name} from "@/plugins/${code}/admin/database/index";`,
      '',
    );
};

export const removeLangFromTypes = ({
  code,
  content,
}: {
  code: string;
  content: string;
}) => {
  // Remove the import statement for the module
  let updatedCode = content.replace(
    `\nimport ${code.replace('-', '')} from '@/plugins/${code}/langs/en.json';`,
    '',
  );

  // Remove the module from the type definition
  const typeRegex = new RegExp(`&\\s+typeof\\s+${code}`, 'g');
  updatedCode = updatedCode.replace(typeRegex, '');

  // Ensure there's no space before the comment after last module
  updatedCode = updatedCode.replace(
    /\s*;\s*\/\/\s*! === MODULE ===/g,
    '; // ! === MODULE ===',
  );

  return updatedCode;
};
