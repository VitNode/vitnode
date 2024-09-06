import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Groups__EditMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  name: Array<Types.StringLanguageInput> | Types.StringLanguageInput;
  content: Types.ContentCreateAdminGroups;
  color?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Groups__EditMutation = { __typename?: 'Mutation', admin__core_groups__edit: { __typename?: 'ShowAdminGroups', id: number } };


export const Admin__Core_Groups__Edit = gql`
    mutation Admin__core_groups__edit($id: Int!, $name: [StringLanguageInput!]!, $content: ContentCreateAdminGroups!, $color: String) {
  admin__core_groups__edit(id: $id, name: $name, content: $content, color: $color) {
    id
  }
}
    `;