import * as Types from '../../types';

import gql from 'graphql-tag';
export type Admin__Sessions__SearchQueryVariables = Types.Exact<{
  search: Types.Scalars['String']['input'];
}>;


export type Admin__Sessions__SearchQuery = { __typename?: 'Query', admin__sessions__search: { __typename?: 'SearchAdminSessionsObj', nav: Array<{ __typename?: 'NavSearchAdminSessions', code: string, code_plugin: string, href: string, keywords: Array<string>, icon?: string, parent_nav_code?: string }> } };


export const Admin__Sessions__Search = gql`
    query Admin__sessions__search($search: String!) {
  admin__sessions__search(search: $search) {
    nav {
      code
      code_plugin
      href
      keywords
      icon
      parent_nav_code
    }
  }
}
    `;