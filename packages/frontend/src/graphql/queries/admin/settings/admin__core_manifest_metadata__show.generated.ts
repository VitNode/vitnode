import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Manifest_Metadata__ShowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Admin__Core_Manifest_Metadata__ShowQuery = { __typename?: 'Query', admin__core_manifest_metadata__show: { __typename?: 'ShowAdminManifestMetadataObj', display: string, start_url: string, theme_color: string, background_color: string } };


export const Admin__Core_Manifest_Metadata__Show = gql`
    query Admin__core_manifest_metadata__show {
  admin__core_manifest_metadata__show {
    display
    start_url
    theme_color
    background_color
  }
}
    `;