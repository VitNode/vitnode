import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__Show__QuickQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.ShowAdminPluginsSortByArgs>;
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__Show__QuickQuery = { __typename?: 'Query', admin__core_plugins__show: { __typename?: 'ShowAdminPluginsObj', edges: Array<{ __typename?: 'ShowAdminPlugins', code: string, name: string, version: string, created: Date, version_code: number }> } };


export const Admin__Core_Plugins__Show__Quick = gql`
    query Admin__core_plugins__show__quick($cursor: Int, $first: Int, $last: Int, $sortBy: ShowAdminPluginsSortByArgs, $search: String) {
  admin__core_plugins__show(
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
    search: $search
  ) {
    edges {
      code
      name
      version
      created
      version_code
    }
  }
}
    `;