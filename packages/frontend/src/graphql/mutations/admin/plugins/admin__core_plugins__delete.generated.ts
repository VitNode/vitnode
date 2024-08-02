import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__DeleteMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Plugins__DeleteMutation = { __typename?: 'Mutation', admin__core_plugins__delete: string };


export const Admin__Core_Plugins__Delete = gql`
    mutation Admin__core_plugins__delete($code: String!) {
  admin__core_plugins__delete(code: $code)
}
    `;