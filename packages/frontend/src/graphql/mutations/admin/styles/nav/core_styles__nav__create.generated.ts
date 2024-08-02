import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Styles__Nav__CreateMutationVariables = Types.Exact<{
  description: Array<Types.TextLanguageInput> | Types.TextLanguageInput;
  external: Types.Scalars['Boolean']['input'];
  href: Types.Scalars['String']['input'];
  name: Array<Types.TextLanguageInput> | Types.TextLanguageInput;
  icon?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Styles__Nav__CreateMutation = { __typename?: 'Mutation', admin__core_styles__nav__create: { __typename?: 'ShowCoreNav', id: number } };


export const Admin__Core_Styles__Nav__Create = gql`
    mutation Admin__core_styles__nav__create($description: [TextLanguageInput!]!, $external: Boolean!, $href: String!, $name: [TextLanguageInput!]!, $icon: String) {
  admin__core_styles__nav__create(
    description: $description
    external: $external
    href: $href
    name: $name
    icon: $icon
  ) {
    id
  }
}
    `;