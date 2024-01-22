import { firstLetterToUpperCase } from '@/functions/first-letter-to-upper-case';

export const createModuleSchema = ({ admin, code }: { code: string; admin?: boolean }) => {
  const name = `${admin ? 'Admin' : ''}${firstLetterToUpperCase(code)}`;

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
  const name = `${admin ? 'Admin' : ''}${firstLetterToUpperCase(code)}`;

  return content
    .replace(
      '// ! === IMPORT ===',
      `import { ${name}Module } from './${code}/${code}.module';\n// ! === IMPORT ===`
    )
    .replace('\n    // ! === MODULE ===', `,\n    ${name}Module\n    // ! === MODULE ===`);
};
