import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Terms_Settings__EditMutationVariables = Types.Exact<{
  content: Array<Types.StringLanguageInput> | Types.StringLanguageInput;
  id: Types.Scalars['Float']['input'];
  title: Array<Types.StringLanguageInput> | Types.StringLanguageInput;
  href?: Types.InputMaybe<Types.Scalars['String']['input']>;
  code: Types.Scalars['String']['input'];
}>;


export type Admin__Core_Terms_Settings__EditMutation = { __typename?: 'Mutation', admin__core_terms_settings__edit: { __typename?: 'ShowCoreTerms', id: number } };


export const Admin__Core_Terms_Settings__Edit = gql`
    mutation Admin__core_terms_settings__edit($content: [StringLanguageInput!]!, $id: Float!, $title: [StringLanguageInput!]!, $href: String, $code: String!) {
  admin__core_terms_settings__edit(
    content: $content
    id: $id
    title: $title
    href: $href
    code: $code
  ) {
    id
  }
}
    `;