import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Email_Settings__EditMutationVariables = Types.Exact<{
  smtpHost: Types.Scalars['String']['input'];
  smtpPassword: Types.Scalars['String']['input'];
  smtpPort: Types.Scalars['Int']['input'];
  smtpSecure: Types.Scalars['Boolean']['input'];
  smtpUser: Types.Scalars['String']['input'];
  colorPrimaryForeground: Types.Scalars['String']['input'];
  colorPrimary: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Email_Settings__EditMutation = { __typename?: 'Mutation', admin__core_email_settings__edit: { __typename?: 'ShowAdminEmailSettingsServiceObj', smtp_host: string } };


export const Admin__Core_Email_Settings__Edit = gql`
    mutation Admin__core_email_settings__edit($smtpHost: String!, $smtpPassword: String!, $smtpPort: Int!, $smtpSecure: Boolean!, $smtpUser: String!, $colorPrimaryForeground: String!, $colorPrimary: String!) {
  admin__core_email_settings__edit(
    smtp_host: $smtpHost
    smtp_password: $smtpPassword
    smtp_port: $smtpPort
    smtp_secure: $smtpSecure
    smtp_user: $smtpUser
    color_primary_foreground: $colorPrimaryForeground
    color_primary: $colorPrimary
  ) {
    smtp_host
  }
}
    `;