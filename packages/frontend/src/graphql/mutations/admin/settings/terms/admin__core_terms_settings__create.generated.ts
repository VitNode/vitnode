import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Terms_Settings__CreateMutationVariables = Types.Exact<{
  content: Array<Types.TextLanguageInput> | Types.TextLanguageInput;
  title: Array<Types.TextLanguageInput> | Types.TextLanguageInput;
  href?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Terms_Settings__CreateMutation = { __typename?: 'Mutation', admin__core_terms_settings__create: { __typename?: 'ShowCoreTerms', id: number } };


export const Admin__Core_Terms_Settings__Create = gql`
    mutation Admin__core_terms_settings__create($content: [TextLanguageInput!]!, $title: [TextLanguageInput!]!, $href: String) {
  admin__core_terms_settings__create(
    content: $content
    title: $title
    href: $href
  ) {
    id
  }
}
    `;