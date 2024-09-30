import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Ai__TestMutationVariables = Types.Exact<{
  prompt: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Ai__TestMutation = { __typename?: 'Mutation', admin__core_ai__test: string };


export const Admin__Core_Ai__Test = gql`
    mutation Admin__core_ai__test($prompt: String!) {
  admin__core_ai__test(prompt: $prompt)
}
    `;