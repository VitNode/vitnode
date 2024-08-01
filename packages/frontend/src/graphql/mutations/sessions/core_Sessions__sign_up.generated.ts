import * as Types from '../../types';

import gql from 'graphql-tag';
export type Core_Sessions__Sign_UpMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
  newsletter?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type Core_Sessions__Sign_UpMutation = { __typename?: 'Mutation', core_sessions__sign_up: { __typename?: 'SignUpCoreSessionsObj', email: string } };


export const Core_Sessions__Sign_Up = gql`
    mutation Core_sessions__sign_up($email: String!, $name: String!, $password: String!, $newsletter: Boolean) {
  core_sessions__sign_up(
    email: $email
    name: $name
    password: $password
    newsletter: $newsletter
  ) {
    email
  }
}
    `;