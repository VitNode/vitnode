import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Members__Show__ItemQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['Float']['input']>;
}>;


export type Admin__Core_Members__Show__ItemQuery = { __typename?: 'Query', admin__core_members__show: { __typename?: 'ShowAdminMembersObj', edges: Array<{ __typename?: 'ShowAdminMembers', avatar_color: string, email: string, id: number, joined: Date, language: string, name: string, name_seo: string, newsletter: boolean, email_verified: boolean, avatar?: { __typename?: 'AvatarUser', dir_folder: string, file_name: string, id: number }, group: { __typename?: 'GroupUser', color?: string, id: number, name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> } }> } };


export const Admin__Core_Members__Show__Item = gql`
    query Admin__core_members__show__item($id: Float) {
  admin__core_members__show(id: $id) {
    edges {
      avatar {
        dir_folder
        file_name
        id
      }
      avatar_color
      email
      group {
        color
        id
        name {
          language_code
          value
        }
      }
      id
      joined
      language
      name
      name_seo
      newsletter
      email_verified
    }
  }
}
    `;