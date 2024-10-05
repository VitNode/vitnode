import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Email__LogsQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type Admin__Core_Email__LogsQuery = { __typename?: 'Query', admin__core_email__logs: { __typename?: 'LogsAdminEmailObj', edges: Array<{ __typename?: 'LogsAdminEmail', created: Date, error: string, html: string, id: number, subject: string, to: string }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number, totalCount: number } } };


export const Admin__Core_Email__Logs = gql`
    query Admin__core_email__logs($cursor: Int, $first: Int, $last: Int) {
  admin__core_email__logs(cursor: $cursor, first: $first, last: $last) {
    edges {
      created
      error
      html
      id
      subject
      to
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