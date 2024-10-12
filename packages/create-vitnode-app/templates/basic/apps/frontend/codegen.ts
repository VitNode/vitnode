import { join } from 'path';

import { codegenConfig } from 'vitnode-frontend/codegen';
import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = codegenConfig({
  pathOutGql: join(process.cwd(), '..', 'frontend', 'src', 'graphql'),
});

export default config;
