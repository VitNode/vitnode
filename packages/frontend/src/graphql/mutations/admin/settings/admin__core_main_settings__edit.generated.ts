import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Main_Settings__EditMutationVariables = Types.Exact<{
  siteName: Types.Scalars['String']['input'];
  siteShortName: Types.Scalars['String']['input'];
  siteDescription: Array<Types.StringLanguageInput> | Types.StringLanguageInput;
  siteCopyright: Array<Types.StringLanguageInput> | Types.StringLanguageInput;
  contactEmail: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Main_Settings__EditMutation = { __typename?: 'Mutation', admin__core_main_settings__edit: { __typename?: 'EditAdminSettingsObj', site_name: string } };


export const Admin__Core_Main_Settings__Edit = gql`
    mutation Admin__core_main_settings__edit($siteName: String!, $siteShortName: String!, $siteDescription: [StringLanguageInput!]!, $siteCopyright: [StringLanguageInput!]!, $contactEmail: String!) {
  admin__core_main_settings__edit(
    site_name: $siteName
    site_short_name: $siteShortName
    site_description: $siteDescription
    site_copyright: $siteCopyright
    contact_email: $contactEmail
  ) {
    site_name
  }
}
    `;