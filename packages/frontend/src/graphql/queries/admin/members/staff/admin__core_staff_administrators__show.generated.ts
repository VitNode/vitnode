import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Staff_Administrators__ShowQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.ShowAdminStaffAdministratorsSortByArgs>;
}>;


export type Admin__Core_Staff_Administrators__ShowQuery = { __typename?: 'Query', admin__core_staff_administrators__show: { __typename?: 'ShowAdminStaffAdministratorsObj', edges: Array<{ __typename?: 'ShowAdminStaffAdministrators', created: Date, id: number, unrestricted: boolean, updated: Date, protected: boolean, user_or_group: { __typename: 'StaffGroupUser', color?: string, id: number, group_name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> } | { __typename: 'User', avatar_color: string, language: string, name_seo: string, id: number, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string }, group: { __typename?: 'GroupUser', id: number, color?: string, name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number, totalCount: number } } };


export const Admin__Core_Staff_Administrators__Show = gql`
    query Admin__core_staff_administrators__show($cursor: Int, $first: Int, $last: Int, $sortBy: ShowAdminStaffAdministratorsSortByArgs) {
  admin__core_staff_administrators__show(
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
  ) {
    edges {
      created
      id
      unrestricted
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
            color
            name {
              language_code
              value
            }
          }
          name_seo
          id
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