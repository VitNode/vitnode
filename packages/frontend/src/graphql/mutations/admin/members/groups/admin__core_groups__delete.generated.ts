import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Groups__DeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type Admin__Core_Groups__DeleteMutation = { __typename?: 'Mutation', admin__core_groups__delete: string };


export const Admin__Core_Groups__Delete = gql`
    mutation Admin__core_groups__delete($id: Int!) {
  admin__core_groups__delete(id: $id)
}
    `;