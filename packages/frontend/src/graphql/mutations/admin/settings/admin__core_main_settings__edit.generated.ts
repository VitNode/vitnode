import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Main_Settings__EditMutationVariables = Types.Exact<{
  siteName: Types.Scalars['String']['input'];
  siteShortName: Types.Scalars['String']['input'];
  siteDescription: Array<Types.TextLanguageInput> | Types.TextLanguageInput;
  siteCopyright: Array<Types.TextLanguageInput> | Types.TextLanguageInput;
}>;


export type Admin__Core_Main_Settings__EditMutation = { __typename?: 'Mutation', admin__core_main_settings__edit: { __typename?: 'EditAdminSettingsObj', site_name: string } };


export const Admin__Core_Main_Settings__Edit = gql`
    mutation Admin__core_main_settings__edit($siteName: String!, $siteShortName: String!, $siteDescription: [TextLanguageInput!]!, $siteCopyright: [TextLanguageInput!]!) {
  admin__core_main_settings__edit(
    site_name: $siteName
    site_short_name: $siteShortName
    site_description: $siteDescription
    site_copyright: $siteCopyright
  ) {
    site_name
  }
}
    `;