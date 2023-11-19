import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://[::1]:8080/graphql',
  documents: ['graphql/**/*.gql'],
  generates: {
    'graphql/hooks.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-document-nodes']
    }
  }
};

export default config;
