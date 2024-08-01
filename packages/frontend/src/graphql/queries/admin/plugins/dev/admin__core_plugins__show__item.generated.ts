import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__Show__ItemQueryVariables = Types.Exact<{
  code?: Types.InputMaybe<Types.Scalars['String']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type Admin__Core_Plugins__Show__ItemQuery = { __typename?: 'Query', admin__core_plugins__show: { __typename?: 'ShowAdminPluginsObj', edges: Array<{ __typename?: 'ShowAdminPlugins', allow_default: boolean, author: string, author_url?: string, code: string, created: Date, default: boolean, description?: string, enabled: boolean, id: number, name: string, support_url: string, updated: Date, version: string, version_code: number }> } };


export const Admin__Core_Plugins__Show__Item = gql`
    query Admin__core_plugins__show__item($code: String, $first: Int) {
  admin__core_plugins__show(code: $code, first: $first) {
    edges {
      allow_default
      author
      author_url
      code
      created
      default
      description
      enabled
      id
      name
      support_url
      updated
      version
      version_code
    }
  }
}
    `;