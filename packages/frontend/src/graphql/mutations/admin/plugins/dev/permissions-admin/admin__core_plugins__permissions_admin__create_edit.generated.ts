import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__Permissions_Admin__Create_EditMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  pluginCode: Types.Scalars['String']['input'];
  oldId?: Types.InputMaybe<Types.Scalars['String']['input']>;
  parentId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__Permissions_Admin__Create_EditMutation = { __typename?: 'Mutation', admin__core_plugins__permissions_admin__create_edit: { __typename?: 'ShowAdminPermissionsAdminPluginsObj', id: string } };


export const Admin__Core_Plugins__Permissions_Admin__Create_Edit = gql`
    mutation Admin__core_plugins__permissions_admin__create_edit($id: String!, $pluginCode: String!, $oldId: String, $parentId: String) {
  admin__core_plugins__permissions_admin__create_edit(
    id: $id
    plugin_code: $pluginCode
    old_id: $oldId
    parent_id: $parentId
  ) {
    id
  }
}
    `;