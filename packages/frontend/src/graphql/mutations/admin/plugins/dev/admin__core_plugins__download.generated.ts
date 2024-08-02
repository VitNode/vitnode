import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__DownloadMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
  version?: Types.InputMaybe<Types.Scalars['String']['input']>;
  versionCode?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type Admin__Core_Plugins__DownloadMutation = { __typename?: 'Mutation', admin__core_plugins__download: string };


export const Admin__Core_Plugins__Download = gql`
    mutation Admin__core_plugins__download($code: String!, $version: String, $versionCode: Int) {
  admin__core_plugins__download(
    code: $code
    version: $version
    version_code: $versionCode
  )
}
    `;