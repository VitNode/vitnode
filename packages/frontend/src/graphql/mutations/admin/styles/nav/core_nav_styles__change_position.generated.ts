import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Nav_Styles__Change_PositionMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  indexToMove: Types.Scalars['Int']['input'];
  parentId: Types.Scalars['Int']['input'];
}>;


export type Admin__Core_Nav_Styles__Change_PositionMutation = { __typename?: 'Mutation', admin__core_nav_styles__change_position: string };


export const Admin__Core_Nav_Styles__Change_Position = gql`
    mutation Admin__core_nav_styles__change_position($id: Int!, $indexToMove: Int!, $parentId: Int!) {
  admin__core_nav_styles__change_position(
    id: $id
    index_to_move: $indexToMove
    parent_id: $parentId
  )
}
    `;