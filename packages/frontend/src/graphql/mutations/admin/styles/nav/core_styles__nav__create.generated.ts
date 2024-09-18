import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Styles__Nav__CreateMutationVariables = Types.Exact<{
  description: Array<Types.StringLanguageInput> | Types.StringLanguageInput;
  external: Types.Scalars['Boolean']['input'];
  href: Types.Scalars['String']['input'];
  name: Array<Types.StringLanguageInput> | Types.StringLanguageInput;
}>;


export type Admin__Core_Styles__Nav__CreateMutation = { __typename?: 'Mutation', admin__core_styles__nav__create: { __typename?: 'ShowCoreNav', id: number } };


export const Admin__Core_Styles__Nav__Create = gql`
    mutation Admin__core_styles__nav__create($description: [StringLanguageInput!]!, $external: Boolean!, $href: String!, $name: [StringLanguageInput!]!) {
  admin__core_styles__nav__create(
    description: $description
    external: $external
    href: $href
    name: $name
  ) {
    id
  }
}
    `;