import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Install__LayoutQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Admin__Install__LayoutQuery = { __typename?: 'Query', admin__install__layout: { __typename?: 'LayoutAdminInstallObj', status: Types.LayoutAdminInstallEnum } };


export const Admin__Install__Layout = gql`
    query Admin__install__layout {
  admin__install__layout {
    status
  }
}
    `;