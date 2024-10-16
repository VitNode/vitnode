import * as Types from '../../types';

import gql from 'graphql-tag';
export type Admin__Sessions__AuthorizationQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Admin__Sessions__AuthorizationQuery = { __typename?: 'Query', admin__sessions__authorization: { __typename?: 'AuthorizationAdminSessionsObj', version: string, restart_server: boolean, user: { __typename?: 'UserWithDangerousInfo', email: string, id: number, name_seo: string, name: string, avatar_color: string, language: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string }, group: { __typename?: 'GroupUser', color?: string, id: number, name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> }, files_permissions: { __typename?: 'FilesPermissionsCoreSessions', allow_upload: boolean, max_storage_for_submit: number, space_used: number, total_max_storage: number } } }, admin__nav__show: Array<{ __typename?: 'ShowAdminNavObj', code: string, nav: Array<{ __typename?: 'ShowAdminNavPluginsObj', code: string, icon?: string, children?: Array<{ __typename?: 'ShowAdminNavPlugins', icon?: string, code: string }> }> }> };


export const Admin__Sessions__Authorization = gql`
    query Admin__sessions__authorization {
  admin__sessions__authorization {
    user {
      email
      id
      name_seo
      name
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
      files_permissions {
        allow_upload
        max_storage_for_submit
        space_used
        total_max_storage
      }
    }
    version
    restart_server
  }
  admin__nav__show {
    code
    nav {
      code
      children {
        icon
        code
      }
      icon
    }
  }
}
    `;