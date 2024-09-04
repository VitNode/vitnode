import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Terms_Settings__EditMutationVariables = Types.Exact<{
  content: Array<Types.TextLanguageInput> | Types.TextLanguageInput;
  id: Types.Scalars['Float']['input'];
  title: Array<Types.TextLanguageInput> | Types.TextLanguageInput;
  href?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Terms_Settings__EditMutation = { __typename?: 'Mutation', admin__core_terms_settings__edit: { __typename?: 'ShowCoreTerms', id: number } };


export const Admin__Core_Terms_Settings__Edit = gql`
    mutation Admin__core_terms_settings__edit($content: [TextLanguageInput!]!, $id: Float!, $title: [TextLanguageInput!]!, $href: String) {
  admin__core_terms_settings__edit(
    content: $content
    id: $id
    title: $title
    href: $href
  ) {
    id
  }
}
    `;