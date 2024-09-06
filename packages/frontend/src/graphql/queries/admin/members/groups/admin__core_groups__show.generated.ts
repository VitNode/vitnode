import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Groups__ShowQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  cursor?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortBy?: Types.InputMaybe<Types.ShowAdminGroupsSortByArgs>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type Admin__Core_Groups__ShowQuery = { __typename?: 'Query', admin__core_groups__show: { __typename?: 'ShowAdminGroupsObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number, hasNextPage: boolean, startCursor?: number, totalCount: number, hasPreviousPage: boolean }, edges: Array<{ __typename?: 'ShowAdminGroups', created: Date, updated: Date, id: number, users_count: number, protected: boolean, guest: boolean, root: boolean, default: boolean, color?: string, name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }>, content: { __typename?: 'ContentShowAdminGroups', files_allow_upload: boolean, files_max_storage_for_submit: number, files_total_max_storage: number } }> } };


export const Admin__Core_Groups__Show = gql`
    query Admin__Core_groups__show($first: Int, $cursor: Int, $search: String, $sortBy: ShowAdminGroupsSortByArgs, $last: Int) {
  admin__core_groups__show(
    first: $first
    cursor: $cursor
    search: $search
    sortBy: $sortBy
    last: $last
  ) {
    pageInfo {
      count
      endCursor
      hasNextPage
      startCursor
      totalCount
      hasPreviousPage
    }
    edges {
      created
      updated
      id
      users_count
      protected
      guest
      name {
        language_code
        value
      }
      root
      default
      content {
        files_allow_upload
        files_max_storage_for_submit
        files_total_max_storage
      }
      color
    }
  }
}
    `;