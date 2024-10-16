import * as Types from '../types';

import gql from 'graphql-tag';
export type Core_Sessions__AuthorizationQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Core_Sessions__AuthorizationQuery = { __typename?: 'Query', core_sessions__authorization: { __typename?: 'AuthorizationCoreSessionsObj', plugin_default: string, user?: { __typename?: 'AuthorizationCurrentUserObj', email: string, id: number, name_seo: string, is_admin: boolean, is_mod: boolean, name: string, newsletter: boolean, avatar_color: string, language: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string }, group: { __typename?: 'GroupUser', color?: string, id: number, name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> }, files_permissions: { __typename?: 'FilesPermissionsCoreSessions', allow_upload: boolean, max_storage_for_submit: number, space_used: number, total_max_storage: number } } }, core_nav__show: { __typename?: 'ShowCoreNavObj', edges: Array<{ __typename?: 'ShowCoreNav', id: number, href: string, external: boolean, position: number, children: Array<{ __typename?: 'ShowCoreNavItem', id: number, position: number, external: boolean, href: string, description: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> }>, description: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> }> }, core_plugins__show: Array<{ __typename?: 'ShowCorePluginsObj', code: string, allow_default: boolean }>, core_settings__show: { __typename?: 'ShowSettingsObj', site_copyright: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }>, site_description: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> }, core_theme_editor__show: { __typename?: 'ShowCoreThemeEditorObj', logos: { __typename?: 'LogoShowCoreThemeEditor', mobile_width: number, text: string, width: number, dark?: { __typename?: 'UploadCoreFilesObj', dir_folder: string, extension: string, file_name: string, file_name_original: string, file_size: number, height?: number, mimetype: string, width?: number }, light?: { __typename?: 'UploadCoreFilesObj', dir_folder: string, extension: string, file_name: string, file_name_original: string, file_size: number, height?: number, mimetype: string, width?: number }, mobile_dark?: { __typename?: 'UploadCoreFilesObj', dir_folder: string, extension: string, file_name: string, file_name_original: string, file_size: number, height?: number, mimetype: string, width?: number }, mobile_light?: { __typename?: 'UploadCoreFilesObj', dir_folder: string, extension: string, file_name: string, file_name_original: string, file_size: number, height?: number, mimetype: string, width?: number } } }, core_middleware__show: { __typename?: 'ShowCoreMiddlewareObj', authorization: { __typename?: 'AuthorizationCoreMiddleware', lock_register: boolean } } };


export const Core_Sessions__Authorization = gql`
    query Core_sessions__authorization {
  core_sessions__authorization {
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
      files_permissions {
        allow_upload
        max_storage_for_submit
        space_used
        total_max_storage
      }
    }
    plugin_default
  }
  core_nav__show {
    edges {
      children {
        description {
          language_code
          value
        }
        id
        name {
          language_code
          value
        }
        position
        external
        href
      }
      description {
        language_code
        value
      }
      id
      name {
        language_code
        value
      }
      href
      external
      position
    }
  }
  core_plugins__show {
    code
    allow_default
  }
  core_settings__show {
    site_copyright {
      language_code
      value
    }
    site_description {
      language_code
      value
    }
  }
  core_theme_editor__show {
    logos {
      dark {
        dir_folder
        extension
        file_name
        file_name_original
        file_size
        height
        mimetype
        width
      }
      light {
        dir_folder
        extension
        file_name
        file_name_original
        file_size
        height
        mimetype
        width
      }
      mobile_dark {
        dir_folder
        extension
        file_name
        file_name_original
        file_size
        height
        mimetype
        width
      }
      mobile_light {
        dir_folder
        extension
        file_name
        file_name_original
        file_size
        height
        mimetype
        width
      }
      mobile_width
      text
      width
    }
  }
  core_middleware__show {
    authorization {
      lock_register
    }
  }
}
    `;