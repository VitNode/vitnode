import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Email_Settings__ShowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Admin__Core_Email_Settings__ShowQuery = { __typename?: 'Query', admin__core_email_settings__show: { __typename?: 'ShowAdminEmailSettingsServiceObj', smtp_host?: string, smtp_port?: number, smtp_secure?: boolean, smtp_user?: string, color_primary: string, provider: Types.EmailProvider, logo?: { __typename?: 'UploadCoreFilesObj', dir_folder: string, extension: string, file_name: string, file_name_original: string, file_size: number, height?: number, mimetype: string, width?: number } } };


export const Admin__Core_Email_Settings__Show = gql`
    query Admin__core_email_settings__show {
  admin__core_email_settings__show {
    smtp_host
    smtp_port
    smtp_secure
    smtp_user
    color_primary
    provider
    logo {
      dir_folder
      extension
      file_name
      file_name_original
      file_size
      height
      mimetype
      width
    }
  }
}
    `;