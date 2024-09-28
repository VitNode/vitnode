import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Members__Confirm_EmailMutationVariables = Types.Exact<{
  id: Types.Scalars['Float']['input'];
}>;


export type Admin__Core_Members__Confirm_EmailMutation = { __typename?: 'Mutation', admin__core_members__confirm_email: string };


export const Admin__Core_Members__Confirm_Email = gql`
    mutation Admin__core_members__confirm_email($id: Float!) {
  admin__core_members__confirm_email(id: $id)
}
    `;