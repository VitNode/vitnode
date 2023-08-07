import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/graphql',
  documents: ['src/*/graphql/**/*.graphql'],
  generates: {
    'src/graphqlHooks.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        fetcher: './fetcher#fetcher'
      }
    }
  }
};

export default config;
