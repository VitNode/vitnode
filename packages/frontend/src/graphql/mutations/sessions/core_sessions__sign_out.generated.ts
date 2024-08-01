import * as Types from '../../types';

import gql from 'graphql-tag';
export type Core_Sessions__Sign_OutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type Core_Sessions__Sign_OutMutation = { __typename?: 'Mutation', core_sessions__sign_out: string };


export const Core_Sessions__Sign_Out = gql`
    mutation Core_sessions__sign_out {
  core_sessions__sign_out
}
    `;