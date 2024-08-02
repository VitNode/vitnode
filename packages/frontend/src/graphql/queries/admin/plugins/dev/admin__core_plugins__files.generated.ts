import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__FilesQueryVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Plugins__FilesQuery = { __typename?: 'Query', admin__core_plugins__files: { __typename?: 'FilesAdminPluginsObj', admin_pages: number, admin_templates: number, databases: number, pages: number, templates: number, default_page: boolean } };


export const Admin__Core_Plugins__Files = gql`
    query Admin__core_plugins__files($code: String!) {
  admin__core_plugins__files(code: $code) {
    admin_pages
    admin_templates
    databases
    pages
    templates
    default_page
  }
}
    `;