import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Languages__DeleteMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Languages__DeleteMutation = { __typename?: 'Mutation', admin__core_languages__delete: string };


export const Admin__Core_Languages__Delete = gql`
    mutation Admin__core_languages__delete($code: String!) {
  admin__core_languages__delete(code: $code)
}
    `;