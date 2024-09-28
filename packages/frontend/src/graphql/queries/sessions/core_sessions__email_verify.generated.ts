import * as Types from '../../types';

import gql from 'graphql-tag';
export type Core_Sessions__Email_VerifyQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  userId: Types.Scalars['Float']['input'];
}>;


export type Core_Sessions__Email_VerifyQuery = { __typename?: 'Query', core_sessions__email_verify: string };


export const Core_Sessions__Email_Verify = gql`
    query Core_sessions__email_verify($token: String!, $userId: Float!) {
  core_sessions__email_verify(token: $token, user_id: $userId)
}
    `;