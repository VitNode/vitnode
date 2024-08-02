import * as Types from '../../types';

import gql from 'graphql-tag';
export type Core_Members__Files__ShowQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.ShowCoreFilesSortByArgs>;
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Core_Members__Files__ShowQuery = { __typename?: 'Query', core_files__show: { __typename?: 'ShowCoreFilesObj', edges: Array<{ __typename?: 'ShowCoreFiles', created: Date, dir_folder: string, extension: string, file_name: string, file_size: number, file_name_original: string, height?: number, id: number, mimetype: string, width?: number, file_alt?: string, count_uses: number, security_key?: string }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number, totalCount: number } } };


export const Core_Members__Files__Show = gql`
    query Core_members__files__show($cursor: Int, $first: Int, $last: Int, $sortBy: ShowCoreFilesSortByArgs, $search: String) {
  core_files__show(
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
    search: $search
  ) {
    edges {
      created
      dir_folder
      extension
      file_name
      file_size
      file_name_original
      height
      id
      mimetype
      width
      file_alt
      count_uses
      security_key
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