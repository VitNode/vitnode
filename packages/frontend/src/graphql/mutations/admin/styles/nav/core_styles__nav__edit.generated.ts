import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Styles__Nav__EditMutationVariables = Types.Exact<{
  description: Array<Types.TextLanguageInput> | Types.TextLanguageInput;
  external: Types.Scalars['Boolean']['input'];
  href: Types.Scalars['String']['input'];
  id: Types.Scalars['Int']['input'];
  name: Array<Types.TextLanguageInput> | Types.TextLanguageInput;
  icon?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Styles__Nav__EditMutation = { __typename?: 'Mutation', admin__core_styles__nav__edit: { __typename?: 'ShowCoreNav', id: number } };


export const Admin__Core_Styles__Nav__Edit = gql`
    mutation Admin__core_styles__nav__edit($description: [TextLanguageInput!]!, $external: Boolean!, $href: String!, $id: Int!, $name: [TextLanguageInput!]!, $icon: String) {
  admin__core_styles__nav__edit(
    description: $description
    external: $external
    href: $href
    id: $id
    name: $name
    icon: $icon
  ) {
    id
  }
}
    `;