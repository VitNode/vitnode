import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Languages__ShowQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  cursor?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortBy?: Types.InputMaybe<Types.ShowCoreLanguagesSortByArgs>;
}>;


export type Admin__Core_Languages__ShowQuery = { __typename?: 'Query', core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', code: string, default: boolean, allow_in_input: boolean, enabled: boolean, id: number, name: string, protected: boolean, timezone: string, locale: string, time_24: boolean, updated: Date, created: Date }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number, totalCount: number } } };


export const Admin__Core_Languages__Show = gql`
    query Admin__Core_languages__show($first: Int, $last: Int, $cursor: Int, $search: String, $sortBy: ShowCoreLanguagesSortByArgs) {
  core_languages__show(
    first: $first
    last: $last
    cursor: $cursor
    search: $search
    sortBy: $sortBy
  ) {
    edges {
      code
      default
      allow_in_input
      enabled
      id
      name
      protected
      timezone
      locale
      time_24
      updated
      created
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;