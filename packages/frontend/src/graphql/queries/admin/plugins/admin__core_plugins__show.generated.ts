import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__ShowQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.ShowAdminPluginsSortByArgs>;
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__ShowQuery = { __typename?: 'Query', admin__core_plugins__show: { __typename?: 'ShowAdminPluginsObj', edges: Array<{ __typename?: 'ShowAdminPlugins', author: string, author_url?: string, code: string, default: boolean, description?: string, enabled: boolean, id: number, name: string, support_url: string, updated: Date, version: string, created: Date, version_code: number, allow_default: boolean }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number, totalCount: number } } };


export const Admin__Core_Plugins__Show = gql`
    query Admin__core_plugins__show($cursor: Int, $first: Int, $last: Int, $sortBy: ShowAdminPluginsSortByArgs, $search: String) {
  admin__core_plugins__show(
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
    search: $search
  ) {
    edges {
      author
      author_url
      code
      default
      description
      enabled
      id
      name
      support_url
      updated
      version
      created
      version_code
      allow_default
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;