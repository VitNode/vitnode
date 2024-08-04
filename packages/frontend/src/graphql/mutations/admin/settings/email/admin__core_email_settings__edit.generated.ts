import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Email_Settings__EditMutationVariables = Types.Exact<{
  colorPrimary: Types.Scalars['String']['input'];
  colorPrimaryForeground: Types.Scalars['String']['input'];
  provider: Types.EmailProvider;
  resendKey?: Types.InputMaybe<Types.Scalars['String']['input']>;
  smtp?: Types.InputMaybe<Types.SmtpEditAdminEmailSettingsService>;
}>;


export type Admin__Core_Email_Settings__EditMutation = { __typename?: 'Mutation', admin__core_email_settings__edit: { __typename?: 'ShowAdminEmailSettingsServiceObj', color_primary: string, smtp_host?: string, smtp_port?: number, smtp_secure?: boolean, smtp_user?: string } };


export const Admin__Core_Email_Settings__Edit = gql`
    mutation Admin__core_email_settings__edit($colorPrimary: String!, $colorPrimaryForeground: String!, $provider: EmailProvider!, $resendKey: String, $smtp: SMTPEditAdminEmailSettingsService) {
  admin__core_email_settings__edit(
    color_primary: $colorPrimary
    color_primary_foreground: $colorPrimaryForeground
    provider: $provider
    resend_key: $resendKey
    smtp: $smtp
  ) {
    color_primary
    smtp_host
    smtp_port
    smtp_secure
    smtp_user
  }
}
    `;