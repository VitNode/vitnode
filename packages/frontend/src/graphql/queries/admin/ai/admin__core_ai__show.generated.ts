import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Ai__ShowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Admin__Core_Ai__ShowQuery = { __typename?: 'Query', admin__core_ai__show: { __typename?: 'ShowAdminCoreAiObj', provider: Types.AiProvider, model?: string } };


export const Admin__Core_Ai__Show = gql`
    query Admin__core_ai__show {
  admin__core_ai__show {
    provider
    model
  }
}
    `;