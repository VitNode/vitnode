import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__Permissions_Admin__DeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  pluginCode: Types.Scalars['String']['input'];
  parentId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__Permissions_Admin__DeleteMutation = { __typename?: 'Mutation', admin__core_plugins__permissions_admin__delete: string };


export const Admin__Core_Plugins__Permissions_Admin__Delete = gql`
    mutation Admin__core_plugins__permissions_admin__delete($id: String!, $pluginCode: String!, $parentId: String) {
  admin__core_plugins__permissions_admin__delete(
    id: $id
    plugin_code: $pluginCode
    parent_id: $parentId
  )
}
    `;