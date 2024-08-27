import { PluginInfoJSONType } from '@/providers/plugins.type';

import { changeCodePluginToCapitalLetters } from '../../change-code-plugin-to-capital-letters';

export const createModuleSchema = ({ code }: { code: string }) => {
  const name = changeCodePluginToCapitalLetters(code);

  return `import { Module } from '@nestjs/common';

import { Admin${name}Module } from './admin/admin.module';

@Module({
  imports: [Admin${name}Module],
})
export class ${name}Module {}
`;
};

export const createModuleAdminSchema = ({ code }: { code: string }) => {
  const name = changeCodePluginToCapitalLetters(code);

  return `import { Module } from '@nestjs/common';

@Module({})
export class Admin${name}Module {}
`;
};

export const createDefaultPage = ({ code }: { code: string }) => {
  return `export default function DefaultPage() {
  return <div className="container my-4">Default Page for ${code}</div>;
}
`;
};

export const createInfoJSON = ({
  allow_default,
  author,
  author_url,
  code,
  description,
  name,
  nav,
  support_url,
}: PluginInfoJSONType): string => {
  const json = {
    name,
    description,
    code,
    author,
    author_url,
    support_url,
    allow_default,
    nav,
  };

  return JSON.stringify(json, null, 2);
};
