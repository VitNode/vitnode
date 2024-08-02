import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__Nav__DeleteMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
  pluginCode: Types.Scalars['String']['input'];
  parentCode?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__Nav__DeleteMutation = { __typename?: 'Mutation', admin__core_plugins__nav__delete: string };


export const Admin__Core_Plugins__Nav__Delete = gql`
    mutation Admin__core_plugins__nav__delete($code: String!, $pluginCode: String!, $parentCode: String) {
  admin__core_plugins__nav__delete(
    code: $code
    plugin_code: $pluginCode
    parent_code: $parentCode
  )
}
    `;