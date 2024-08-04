import * as Types from '../../types';

import gql from 'graphql-tag';
export type Core_Members__Show__SearchQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type Core_Members__Show__SearchQuery = { __typename?: 'Query', core_members__show: { __typename?: 'ShowCoreMembersObj', edges: Array<{ __typename?: 'ShowCoreMembers', avatar_color: string, id: number, name: string, name_seo: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string }, group: { __typename?: 'GroupUser', id: number, color?: string, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } };


export const Core_Members__Show__Search = gql`
    query Core_members__show__search($search: String, $first: Int) {
  core_members__show(search: $search, first: $first) {
    edges {
      avatar_color
      avatar {
        id
        dir_folder
        file_name
      }
      group {
        id
        name {
          language_code
          value
        }
        color
      }
      id
      name
      name_seo
    }
  }
}
    `;