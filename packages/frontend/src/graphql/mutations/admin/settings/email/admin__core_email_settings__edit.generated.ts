import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Email_Settings__EditMutationVariables = Types.Exact<{
  colorPrimary: Types.Scalars['String']['input'];
  colorPrimaryForeground: Types.Scalars['String']['input'];
  provider: Types.EmailProvider;
  resendKey?: Types.InputMaybe<Types.Scalars['String']['input']>;
  smtp?: Types.InputMaybe<Types.SmtpEditAdminEmailSettingsService>;
  logo?: Types.InputMaybe<Types.UploadWithKeepCoreFilesArgs>;
  from: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Email_Settings__EditMutation = { __typename?: 'Mutation', admin__core_email_settings__edit: { __typename?: 'ShowAdminEmailSettingsServiceObj', provider: Types.EmailProvider } };


export const Admin__Core_Email_Settings__Edit = gql`
    mutation Admin__core_email_settings__edit($colorPrimary: String!, $colorPrimaryForeground: String!, $provider: EmailProvider!, $resendKey: String, $smtp: SMTPEditAdminEmailSettingsService, $logo: UploadWithKeepCoreFilesArgs, $from: String!) {
  admin__core_email_settings__edit(
    color_primary: $colorPrimary
    color_primary_foreground: $colorPrimaryForeground
    provider: $provider
    resend_key: $resendKey
    smtp: $smtp
    logo: $logo
    from: $from
  ) {
    provider
  }
}
    `;