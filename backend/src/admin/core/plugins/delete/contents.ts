import { changeCodePluginToCapitalLetters } from '@/src/admin/core/plugins/functions/change-code-plugin-to-capital-letters';

export const removeModuleFromRootSchema = ({
  admin,
  code,
  content
}: {
  code: string;
  content: string;
  admin?: boolean;
}) => {
  const name = `${admin ? 'Admin' : ''}${changeCodePluginToCapitalLetters(code)}`;

  return content
    .replace(`\n    ${name}Module`, '')
    .replace(`\nimport { ${name}Module } from './${code}/${code}.module';`, '')
    .replace(`,\n    // ! === MODULE ===`, '\n    // ! === MODULE ===');
};

export const removeDatabaseFromService = ({
  admin,
  code,
  content
}: {
  code: string;
  content: string;
  admin?: boolean;
}) => {
  const name = `${admin ? 'Admin' : ''}${changeCodePluginToCapitalLetters(code)}`;

  return content
    .replace(`\n  ...table${name}`, '')
    .replace(`\nimport table${name} from '../src/admin/${code}/database/index';`, '')
    .replace(`,\n  // ! === MODULE ===`, '\n  // ! === MODULE ===');
};
