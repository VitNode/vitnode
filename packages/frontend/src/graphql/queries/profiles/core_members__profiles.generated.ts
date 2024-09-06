import * as Types from '../../types';

import gql from 'graphql-tag';
export type Core_Members__ProfilesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  nameSeo: Types.Scalars['String']['input'];
}>;


export type Core_Members__ProfilesQuery = { __typename?: 'Query', core_members__show: { __typename?: 'ShowCoreMembersObj', edges: Array<{ __typename?: 'ShowCoreMembers', avatar_color: string, id: number, joined: Date, name: string, name_seo: string, posts: number, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string }, group: { __typename?: 'GroupUser', id: number, color?: string, name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> } }> } };


export const Core_Members__Profiles = gql`
    query Core_members__profiles($first: Int, $nameSeo: String!) {
  core_members__show(first: $first, name_seo: $nameSeo) {
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
      joined
      name
      name_seo
      posts
    }
  }
}
    `;