import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Groups__Show_ShortQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Groups__Show_ShortQuery = { __typename?: 'Query', admin__core_groups__show: { __typename?: 'ShowAdminGroupsObj', edges: Array<{ __typename?: 'ShowAdminGroups', id: number, guest: boolean, color: string, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };


export const Admin__Core_Groups__Show_Short = gql`
    query Admin__Core_groups__show_short($first: Int, $search: String) {
  admin__core_groups__show(first: $first, search: $search) {
    edges {
      id
      name {
        language_code
        value
      }
      guest
      color
    }
  }
}
    `;