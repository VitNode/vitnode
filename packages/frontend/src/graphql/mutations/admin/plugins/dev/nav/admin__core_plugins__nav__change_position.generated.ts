import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__Nav__Change_PositionMutationVariables = Types.Exact<{
  indexToMove: Types.Scalars['Int']['input'];
  pluginCode: Types.Scalars['String']['input'];
  code: Types.Scalars['String']['input'];
  parentCode?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__Nav__Change_PositionMutation = { __typename?: 'Mutation', admin__core_plugins__nav__change_position: string };


export const Admin__Core_Plugins__Nav__Change_Position = gql`
    mutation Admin__core_plugins__nav__change_position($indexToMove: Int!, $pluginCode: String!, $code: String!, $parentCode: String) {
  admin__core_plugins__nav__change_position(
    index_to_move: $indexToMove
    plugin_code: $pluginCode
    code: $code
    parent_code: $parentCode
  )
}
    `;