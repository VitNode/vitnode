import { join } from 'path';

import { codegenConfig } from 'vitnode-backend';
import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = codegenConfig({
  pathOutGql: join(process.cwd(), '..', 'frontend', 'graphql'),
});

export default config;
