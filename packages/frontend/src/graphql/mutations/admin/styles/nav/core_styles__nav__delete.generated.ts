import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Styles__Nav__DeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type Admin__Core_Styles__Nav__DeleteMutation = { __typename?: 'Mutation', admin__core_styles__nav__delete: string };


export const Admin__Core_Styles__Nav__Delete = gql`
    mutation Admin__core_styles__nav__delete($id: Int!) {
  admin__core_styles__nav__delete(id: $id)
}
    `;