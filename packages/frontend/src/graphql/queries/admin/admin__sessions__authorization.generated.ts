import * as Types from '../../types';

import gql from 'graphql-tag';
export type Admin__Sessions__AuthorizationQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Admin__Sessions__AuthorizationQuery = { __typename?: 'Query', admin__sessions__authorization: { __typename?: 'AuthorizationAdminSessionsObj', version: string, user?: { __typename?: 'AuthorizationCurrentUserObj', email: string, id: number, name_seo: string, is_admin: boolean, is_mod: boolean, name: string, newsletter: boolean, avatar_color: string, language: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string }, group: { __typename?: 'GroupUser', color?: string, id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }, admin__nav__show: Array<{ __typename?: 'ShowAdminNavObj', code: string, nav: Array<{ __typename?: 'ShowAdminNavPluginsObj', href: string, code: string, icon?: string, children?: Array<{ __typename?: 'ShowAdminNavPlugins', icon?: string, href: string, code: string }> }> }> };


export const Admin__Sessions__Authorization = gql`
    query Admin__sessions__authorization {
  admin__sessions__authorization {
    user {
      email
      id
      name_seo
      is_admin
      is_mod
      name
      newsletter
      avatar_color
      language
      avatar {
        id
        dir_folder
        file_name
      }
      group {
        name {
          language_code
          value
        }
        color
        id
      }
    }
    version
  }
  admin__nav__show {
    code
    nav {
      href
      code
      children {
        icon
        href
        code
      }
      icon
    }
  }
}
    `;