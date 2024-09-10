import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__Nav__CreateMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
  pluginCode: Types.Scalars['String']['input'];
  icon?: Types.InputMaybe<Types.Scalars['String']['input']>;
  parentCode?: Types.InputMaybe<Types.Scalars['String']['input']>;
  keywords: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;


export type Admin__Core_Plugins__Nav__CreateMutation = { __typename?: 'Mutation', admin__core_plugins__nav__create: { __typename?: 'ShowAdminNavPluginsObj', code: string } };


export const Admin__Core_Plugins__Nav__Create = gql`
    mutation Admin__core_plugins__nav__create($code: String!, $pluginCode: String!, $icon: String, $parentCode: String, $keywords: [String!]!) {
  admin__core_plugins__nav__create(
    code: $code
    plugin_code: $pluginCode
    icon: $icon
    parent_code: $parentCode
    keywords: $keywords
  ) {
    code
  }
}
    `;