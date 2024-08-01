import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Languages__UpdateMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
  file: Types.Scalars['Upload']['input'];
}>;


export type Admin__Core_Languages__UpdateMutation = { __typename?: 'Mutation', admin__core_languages__update: string };


export const Admin__Core_Languages__Update = gql`
    mutation Admin__core_languages__update($code: String!, $file: Upload!) {
  admin__core_languages__update(code: $code, file: $file)
}
    `;