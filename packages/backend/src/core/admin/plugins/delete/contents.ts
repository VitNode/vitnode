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
    .replace(`\nimport { ${name}Module } from './${code}/${code}.module';`, '');
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
    );
};

export const removeLangFromTypes = ({
  code,
  content,
}: {
  code: string;
  content: string;
}) => {
  return content.replace(
    `\n  typeof import('@/plugins/${code}/langs/en.json') &`,
    '',
  );
};
