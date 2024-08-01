import * as Types from '../../types';

import gql from 'graphql-tag';
export type Core_Sessions__Sign_InMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
  remember?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  admin?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type Core_Sessions__Sign_InMutation = { __typename?: 'Mutation', core_sessions__sign_in: string };


export const Core_Sessions__Sign_In = gql`
    mutation Core_sessions__sign_in($email: String!, $password: String!, $remember: Boolean, $admin: Boolean) {
  core_sessions__sign_in(
    email: $email
    password: $password
    remember: $remember
    admin: $admin
  )
}
    `;