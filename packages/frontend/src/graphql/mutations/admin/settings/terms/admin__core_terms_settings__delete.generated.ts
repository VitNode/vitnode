import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Terms_Settings__DeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type Admin__Core_Terms_Settings__DeleteMutation = { __typename?: 'Mutation', admin__core_terms_settings__delete: string };


export const Admin__Core_Terms_Settings__Delete = gql`
    mutation Admin__core_terms_settings__delete($id: Int!) {
  admin__core_terms_settings__delete(id: $id)
}
    `;