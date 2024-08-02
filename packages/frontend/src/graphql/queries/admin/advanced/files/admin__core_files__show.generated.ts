import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Files__ShowQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.ShowCoreFilesSortByArgs>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  search?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Files__ShowQuery = { __typename?: 'Query', admin__core_files__show: { __typename?: 'ShowAdminFilesObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number, totalCount: number }, edges: Array<{ __typename?: 'ShowAdminFiles', count_uses: number, created: Date, dir_folder: string, extension: string, file_alt?: string, file_name: string, file_name_original: string, file_size: number, height?: number, id: number, mimetype: string, security_key?: string, width?: number, user: { __typename?: 'User', id: number, name: string, name_seo: string } }> } };


export const Admin__Core_Files__Show = gql`
    query Admin__core_files__show($cursor: Int, $first: Int, $sortBy: ShowCoreFilesSortByArgs, $last: Int, $search: String) {
  admin__core_files__show(
    cursor: $cursor
    first: $first
    sortBy: $sortBy
    last: $last
    search: $search
  ) {
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
    edges {
      count_uses
      created
      dir_folder
      extension
      file_alt
      file_name
      file_name_original
      file_size
      height
      id
      mimetype
      security_key
      user {
        id
        name
        name_seo
      }
      width
    }
  }
}
    `;