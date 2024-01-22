import { firstLetterToUpperCase } from '@/functions/first-letter-to-upper-case';

export const removeModuleFromRootSchema = ({
  admin,
  code,
  content
}: {
  code: string;
  content: string;
  admin?: boolean;
}) => {
  const name = `${admin ? 'Admin' : ''}${firstLetterToUpperCase(code)}`;

  return content
    .replace(`\n    ${name}Module`, '')
    .replace(`\nimport { ${name}Module } from './${code}/${code}.module';`, '')
    .replace(`,\n    // ! === MODULE ===`, '\n    // ! === MODULE ===');
};
