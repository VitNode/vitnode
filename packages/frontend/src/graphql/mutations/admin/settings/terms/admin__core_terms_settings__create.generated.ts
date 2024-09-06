import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Terms_Settings__CreateMutationVariables = Types.Exact<{
  content: Array<Types.StringLanguageInput> | Types.StringLanguageInput;
  title: Array<Types.StringLanguageInput> | Types.StringLanguageInput;
  href?: Types.InputMaybe<Types.Scalars['String']['input']>;
  code: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Terms_Settings__CreateMutation = { __typename?: 'Mutation', admin__core_terms_settings__create: { __typename?: 'ShowCoreTerms', id: number } };


export const Admin__Core_Terms_Settings__Create = gql`
    mutation Admin__core_terms_settings__create($content: [StringLanguageInput!]!, $title: [StringLanguageInput!]!, $href: String, $code: String!) {
  admin__core_terms_settings__create(
    content: $content
    title: $title
    href: $href
    code: $code
  ) {
    id
  }
}
    `;