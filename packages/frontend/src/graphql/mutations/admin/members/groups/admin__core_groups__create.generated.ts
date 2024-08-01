import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Groups__CreateMutationVariables = Types.Exact<{
  name: Array<Types.TextLanguageInput> | Types.TextLanguageInput;
  content: Types.ContentCreateAdminGroups;
  color?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Groups__CreateMutation = { __typename?: 'Mutation', admin__core_groups__create: { __typename?: 'ShowAdminGroups', id: number } };


export const Admin__Core_Groups__Create = gql`
    mutation Admin__core_groups__create($name: [TextLanguageInput!]!, $content: ContentCreateAdminGroups!, $color: String) {
  admin__core_groups__create(name: $name, content: $content, color: $color) {
    id
  }
}
    `;