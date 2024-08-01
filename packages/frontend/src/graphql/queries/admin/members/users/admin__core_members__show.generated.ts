import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Members__ShowQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortBy?: Types.InputMaybe<Types.ShowAdminMembersSortByArgs>;
  groups?: Types.InputMaybe<Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input']>;
}>;


export type Admin__Core_Members__ShowQuery = { __typename?: 'Query', admin__core_members__show: { __typename?: 'ShowAdminMembersObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number, totalCount: number }, edges: Array<{ __typename?: 'ShowAdminMembers', avatar_color: string, email: string, id: number, name_seo: string, joined: Date, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string }, group: { __typename?: 'GroupUser', id: number, color: string, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } };


export const Admin__Core_Members__Show = gql`
    query Admin__core_members__show($cursor: Int, $first: Int, $last: Int, $search: String, $sortBy: ShowAdminMembersSortByArgs, $groups: [Int!]) {
  admin__core_members__show(
    cursor: $cursor
    first: $first
    last: $last
    search: $search
    sortBy: $sortBy
    groups: $groups
  ) {
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
    edges {
      avatar_color
      avatar {
        id
        dir_folder
        file_name
      }
      email
      id
      name_seo
      joined
      name
      group {
        id
        name {
          language_code
          value
        }
        color
      }
    }
  }
}
    `;