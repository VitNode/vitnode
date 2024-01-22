const firstLetterToUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const createModuleSchema = ({ admin, code }: { code: string; admin?: boolean }) => {
  const current = firstLetterToUpperCase(code);

  return `import { Module } from '@nestjs/common';

@Module({})
export class ${admin ? 'Admin' : ''}${current}Module {}
`;
};
