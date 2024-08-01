import * as Types from '../types';

import gql from 'graphql-tag';
export type Core_Middleware__ShowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Core_Middleware__ShowQuery = { __typename?: 'Query', core_middleware__show: { __typename?: 'ShowCoreMiddlewareObj', plugins: Array<string>, languages: Array<{ __typename?: 'LanguagesCoreMiddleware', code: string, default: boolean, enabled: boolean }> } };


export const Core_Middleware__Show = gql`
    query Core_middleware__show {
  core_middleware__show {
    languages {
      code
      default
      enabled
    }
    plugins
  }
}
    `;