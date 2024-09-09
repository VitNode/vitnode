import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Members__DeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['Float']['input'];
}>;


export type Admin__Core_Members__DeleteMutation = { __typename?: 'Mutation', admin__core_members__delete: string };


export const Admin__Core_Members__Delete = gql`
    mutation Admin__core_members__delete($id: Float!) {
  admin__core_members__delete(id: $id)
}
    `;