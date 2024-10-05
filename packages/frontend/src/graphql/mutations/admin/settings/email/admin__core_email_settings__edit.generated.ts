import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Email_Settings__EditMutationVariables = Types.Exact<{
  colorPrimary: Types.Scalars['String']['input'];
  colorPrimaryForeground: Types.Scalars['String']['input'];
  logo?: Types.InputMaybe<Types.UploadWithKeepCoreFilesArgs>;
  from: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Email_Settings__EditMutation = { __typename?: 'Mutation', admin__core_email_settings__edit: { __typename?: 'ShowAdminEmailSettingsServiceObj', from: string } };


export const Admin__Core_Email_Settings__Edit = gql`
    mutation Admin__core_email_settings__edit($colorPrimary: String!, $colorPrimaryForeground: String!, $logo: UploadWithKeepCoreFilesArgs, $from: String!) {
  admin__core_email_settings__edit(
    color_primary: $colorPrimary
    color_primary_foreground: $colorPrimaryForeground
    logo: $logo
    from: $from
  ) {
    from
  }
}
    `;