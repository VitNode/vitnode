import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Email_Settings__ShowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Admin__Core_Email_Settings__ShowQuery = { __typename?: 'Query', admin__core_email_settings__show: { __typename?: 'ShowAdminEmailSettingsServiceObj', smtp_host: string, smtp_port: number, smtp_secure: boolean, smtp_user: string, color_primary: string } };


export const Admin__Core_Email_Settings__Show = gql`
    query Admin__core_email_settings__show {
  admin__core_email_settings__show {
    smtp_host
    smtp_port
    smtp_secure
    smtp_user
    color_primary
  }
}
    `;