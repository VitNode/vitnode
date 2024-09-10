import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__Nav__EditMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
  icon?: Types.InputMaybe<Types.Scalars['String']['input']>;
  pluginCode: Types.Scalars['String']['input'];
  previousCode: Types.Scalars['String']['input'];
  parentCode?: Types.InputMaybe<Types.Scalars['String']['input']>;
  keywords: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;


export type Admin__Core_Plugins__Nav__EditMutation = { __typename?: 'Mutation', admin__core_plugins__nav__edit: { __typename?: 'ShowAdminNavPluginsObj', code: string } };


export const Admin__Core_Plugins__Nav__Edit = gql`
    mutation Admin__core_plugins__nav__edit($code: String!, $icon: String, $pluginCode: String!, $previousCode: String!, $parentCode: String, $keywords: [String!]!) {
  admin__core_plugins__nav__edit(
    code: $code
    icon: $icon
    plugin_code: $pluginCode
    previous_code: $previousCode
    parent_code: $parentCode
    keywords: $keywords
  ) {
    code
  }
}
    `;