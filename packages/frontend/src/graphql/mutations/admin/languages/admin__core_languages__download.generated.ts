import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Languages__DownloadMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
  plugins: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;


export type Admin__Core_Languages__DownloadMutation = { __typename?: 'Mutation', admin__core_languages__download: string };


export const Admin__Core_Languages__Download = gql`
    mutation Admin__core_languages__download($code: String!, $plugins: [String!]!) {
  admin__core_languages__download(code: $code, plugins: $plugins)
}
    `;