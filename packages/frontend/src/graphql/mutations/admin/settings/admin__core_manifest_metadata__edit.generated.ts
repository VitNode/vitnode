import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Manifest_Metadata__EditMutationVariables = Types.Exact<{
  display: Types.Scalars['String']['input'];
  startUrl: Types.Scalars['String']['input'];
  backgroundColor: Types.Scalars['String']['input'];
  themeColor: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Manifest_Metadata__EditMutation = { __typename?: 'Mutation', admin__core_manifest_metadata__edit: { __typename?: 'ShowAdminManifestMetadataObj', display: string } };


export const Admin__Core_Manifest_Metadata__Edit = gql`
    mutation Admin__core_manifest_metadata__edit($display: String!, $startUrl: String!, $backgroundColor: String!, $themeColor: String!) {
  admin__core_manifest_metadata__edit(
    display: $display
    start_url: $startUrl
    background_color: $backgroundColor
    theme_color: $themeColor
  ) {
    display
  }
}
    `;