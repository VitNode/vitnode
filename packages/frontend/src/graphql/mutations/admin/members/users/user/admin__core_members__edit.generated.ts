import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Members__EditMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  id: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
  newsletter: Types.Scalars['Boolean']['input'];
}>;


export type Admin__Core_Members__EditMutation = { __typename?: 'Mutation', admin__core_members__edit: { __typename?: 'EditAdminMembersObj', id: number } };


export const Admin__Core_Members__Edit = gql`
    mutation Admin__core_members__edit($email: String!, $id: Int!, $name: String!, $newsletter: Boolean!) {
  admin__core_members__edit(
    email: $email
    id: $id
    name: $name
    newsletter: $newsletter
  ) {
    id
  }
}
    `;