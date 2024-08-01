import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Staff_Moderators__DeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type Admin__Core_Staff_Moderators__DeleteMutation = { __typename?: 'Mutation', admin__core_staff_moderators__delete: string };


export const Admin__Core_Staff_Moderators__Delete = gql`
    mutation Admin__core_staff_moderators__delete($id: Int!) {
  admin__core_staff_moderators__delete(id: $id)
}
    `;