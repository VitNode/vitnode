import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Members__CreateMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Members__CreateMutation = { __typename?: 'Mutation', admin__core_members__create: { __typename?: 'SignUpCoreSessionsObj', email: string } };


export const Admin__Core_Members__Create = gql`
    mutation Admin__core_members__create($email: String!, $name: String!, $password: String!) {
  admin__core_members__create(email: $email, name: $name, password: $password) {
    email
  }
}
    `;