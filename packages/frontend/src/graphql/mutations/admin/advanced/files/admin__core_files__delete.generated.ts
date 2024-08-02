import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Files__DeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type Admin__Core_Files__DeleteMutation = { __typename?: 'Mutation', admin__core_files__delete: string };


export const Admin__Core_Files__Delete = gql`
    mutation Admin__core_files__delete($id: Int!) {
  admin__core_files__delete(id: $id)
}
    `;