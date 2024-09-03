import * as Types from '../../types';

import gql from 'graphql-tag';
export type Core_Terms__ShowQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type Core_Terms__ShowQuery = { __typename?: 'Query', core_terms__show: { __typename?: 'ShowCoreTermsObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number, totalCount: number }, edges: Array<{ __typename?: 'ShowCoreTerms', created: Date, href?: string, id: number, updated: Date, content: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };


export const Core_Terms__Show = gql`
    query Core_terms__show($cursor: Int, $first: Int, $last: Int) {
  core_terms__show(cursor: $cursor, first: $first, last: $last) {
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
    edges {
      content {
        language_code
        value
      }
      created
      href
      id
      title {
        language_code
        value
      }
      updated
    }
  }
}
    `;