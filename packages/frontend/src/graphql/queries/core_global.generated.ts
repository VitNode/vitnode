import * as Types from '../types';

import gql from 'graphql-tag';
export type Core_GlobalQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Core_GlobalQuery = { __typename?: 'Query', core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', default: boolean, code: string, id: number, name: string, timezone: string, enabled: boolean, locale: string, allow_in_input: boolean, time_24: boolean }> }, core_plugins__show: Array<{ __typename?: 'ShowCorePluginsObj', code: string }>, core_settings__show: { __typename?: 'ShowSettingsObj', site_name: string, site_short_name: string, site_copyright: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }>, site_description: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> }, core_middleware__show: { __typename?: 'ShowCoreMiddlewareObj', editor: { __typename?: 'EditorShowCoreMiddleware', sticky: boolean, files: { __typename?: 'FilesEditorShowCoreMiddleware', allow_type: Types.AllowTypeFilesEnum } }, security: { __typename?: 'SecurityCoreMiddleware', captcha: { __typename?: 'CaptchaSecurityCoreMiddleware', site_key: string, type: Types.CaptchaTypeEnum } } } };


export const Core_Global = gql`
    query Core_global {
  core_languages__show {
    edges {
      default
      code
      id
      name
      timezone
      enabled
      locale
      allow_in_input
      time_24
    }
  }
  core_plugins__show {
    code
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
    site_name
    site_short_name
  }
  core_middleware__show {
    editor {
      files {
        allow_type
      }
      sticky
    }
    security {
      captcha {
        site_key
        type
      }
    }
  }
}
    `;