import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__Nav__ShowQueryVariables = Types.Exact<{
  pluginCode: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Plugins__Nav__ShowQuery = { __typename?: 'Query', admin__core_plugins__nav__show: Array<{ __typename?: 'ShowAdminNavPluginsObj', code: string, icon?: string, keywords: Array<string>, children?: Array<{ __typename?: 'ShowAdminNavPlugins', code: string, keywords: Array<string>, icon?: string }> }> };


export const Admin__Core_Plugins__Nav__Show = gql`
    query Admin__core_plugins__nav__show($pluginCode: String!) {
  admin__core_plugins__nav__show(plugin_code: $pluginCode) {
    code
    icon
    children {
      code
      keywords
      icon
    }
    keywords
  }
}
    `;