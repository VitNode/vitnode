import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Terms_Settings__DeleteMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Terms_Settings__DeleteMutation = { __typename?: 'Mutation', admin__core_terms_settings__delete: string };


export const Admin__Core_Terms_Settings__Delete = gql`
    mutation Admin__core_terms_settings__delete($code: String!) {
  admin__core_terms_settings__delete(code: $code)
}
    `;