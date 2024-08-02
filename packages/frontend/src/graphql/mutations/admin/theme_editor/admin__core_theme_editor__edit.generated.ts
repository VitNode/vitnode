import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Theme_Editor__EditMutationVariables = Types.Exact<{
  colors?: Types.InputMaybe<Types.ColorsEditAdminThemeEditor>;
  logos: Types.LogosEditAdminThemeEditor;
}>;


export type Admin__Core_Theme_Editor__EditMutation = { __typename?: 'Mutation', admin__core_theme_editor__edit: string };


export const Admin__Core_Theme_Editor__Edit = gql`
    mutation Admin__core_theme_editor__edit($colors: ColorsEditAdminThemeEditor, $logos: LogosEditAdminThemeEditor!) {
  admin__core_theme_editor__edit(colors: $colors, logos: $logos)
}
    `;