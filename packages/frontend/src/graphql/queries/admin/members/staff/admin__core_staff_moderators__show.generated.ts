import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Staff_Moderators__ShowQueryVariables = Types.Exact<{
  sortBy?: Types.InputMaybe<Types.ShowAdminStaffModeratorsSortByArgs>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  cursor?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type Admin__Core_Staff_Moderators__ShowQuery = { __typename?: 'Query', admin__core_staff_moderators__show: { __typename?: 'ShowAdminStaffModeratorsObj', edges: Array<{ __typename?: 'ShowAdminStaffModerators', created: Date, id: number, updated: Date, protected: boolean, user_or_group: { __typename: 'StaffGroupUser', color?: string, id: number, group_name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> } | { __typename: 'User', avatar_color: string, language: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string }, group: { __typename?: 'GroupUser', id: number, color?: string, name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number, totalCount: number } } };


export const Admin__Core_Staff_Moderators__Show = gql`
    query Admin__core_staff_moderators__show($sortBy: ShowAdminStaffModeratorsSortByArgs, $last: Int, $first: Int, $cursor: Int) {
  admin__core_staff_moderators__show(
    sortBy: $sortBy
    last: $last
    first: $first
    cursor: $cursor
  ) {
    edges {
      created
      id
      user_or_group {
        __typename
        ... on User {
          avatar_color
          avatar {
            id
            dir_folder
            file_name
          }
          language
          group {
            id
            name {
              language_code
              value
            }
            color
          }
          id
          name_seo
          name
        }
        ... on StaffGroupUser {
          group_name {
            language_code
            value
          }
          color
          id
        }
      }
      updated
      protected
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