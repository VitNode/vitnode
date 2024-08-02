import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin_Sessions__Sign_OutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type Admin_Sessions__Sign_OutMutation = { __typename?: 'Mutation', admin_sessions__sign_out: string };


export const Admin_Sessions__Sign_Out = gql`
    mutation Admin_sessions__sign_out {
  admin_sessions__sign_out
}
    `;