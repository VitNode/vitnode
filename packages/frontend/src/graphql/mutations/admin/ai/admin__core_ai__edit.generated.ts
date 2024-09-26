import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Ai__EditMutationVariables = Types.Exact<{
  provider: Types.AiProvider;
  key?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Ai__EditMutation = { __typename?: 'Mutation', admin__core_ai__edit: { __typename?: 'ShowAdminCoreAiObj', provider: Types.AiProvider } };


export const Admin__Core_Ai__Edit = gql`
    mutation Admin__core_ai__edit($provider: AiProvider!, $key: String) {
  admin__core_ai__edit(provider: $provider, key: $key) {
    provider
  }
}
    `;