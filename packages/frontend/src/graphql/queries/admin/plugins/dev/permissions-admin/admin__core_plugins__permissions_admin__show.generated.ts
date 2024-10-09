import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__Permissions_Admin__ShowQueryVariables = Types.Exact<{
  pluginCode: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Plugins__Permissions_Admin__ShowQuery = { __typename?: 'Query', admin__core_plugins__permissions_admin__show: Array<{ __typename?: 'ShowAdminPermissionsAdminPluginsObj', id: string, children: Array<{ __typename?: 'ShowAdminPermissionsAdminPlugins', id: string }> }> };


export const Admin__Core_Plugins__Permissions_Admin__Show = gql`
    query Admin__core_plugins__permissions_admin__show($pluginCode: String!) {
  admin__core_plugins__permissions_admin__show(plugin_code: $pluginCode) {
    children {
      id
    }
    id
  }
}
    `;