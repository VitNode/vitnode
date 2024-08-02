import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Styles__Editor__EditMutationVariables = Types.Exact<{
  files: Types.FilesEditAdminEditorStyles;
  sticky: Types.Scalars['Boolean']['input'];
}>;


export type Admin__Core_Styles__Editor__EditMutation = { __typename?: 'Mutation', admin__core_styles__editor__edit: { __typename?: 'EditorShowCoreMiddleware', sticky: boolean } };


export const Admin__Core_Styles__Editor__Edit = gql`
    mutation Admin__core_styles__editor__edit($files: FilesEditAdminEditorStyles!, $sticky: Boolean!) {
  admin__core_styles__editor__edit(files: $files, sticky: $sticky) {
    sticky
  }
}
    `;