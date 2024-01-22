const firstLetterToUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const createModuleSchema = ({ admin, code }: { code: string; admin?: boolean }) => {
  const name = `${admin ? 'Admin' : ''}${firstLetterToUpperCase(code)}`;

  return `import { Module } from '@nestjs/common';

@Module({})
export class ${name}Module {}
`;
};

export const changeModuleSchema = ({
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
    .replace(' // ! === MODULE ===', `,\n    ${name}Module // ! === MODULE ===`);
};
