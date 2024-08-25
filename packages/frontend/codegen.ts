import { join } from 'path';

import { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

dotenv.config({
  path: join(process.cwd(), '..', '..', '.env'),
});

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8080'}/graphql`,
  documents: [join(process.cwd(), 'src/graphql/**/*.gql')],
  config: {
    maybeValue: 'T',
    scalars: {
      DateTime: 'Date',
      Upload: 'File',
    },
    enumsAsConst: true,
    allowEnumStringTypes: true,
    namingConvention: {
      enumValues: 'change-case-all#lowerCase',
    },
  },
  generates: {
    './src/graphql/types.ts': {
      plugins: ['typescript'],
    },
    ['./src/graphql/']: {
      preset: 'near-operation-file',
      presetConfig: { extension: '.generated.ts', baseTypesPath: 'types.ts' },
      plugins: ['typescript-operations', 'typescript-document-nodes'],
    },
  },
};

export default config;
