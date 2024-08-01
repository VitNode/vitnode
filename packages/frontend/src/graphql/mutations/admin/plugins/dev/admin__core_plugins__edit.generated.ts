import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__EditMutationVariables = Types.Exact<{
  author: Types.Scalars['String']['input'];
  authorUrl?: Types.InputMaybe<Types.Scalars['String']['input']>;
  code: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
  supportUrl: Types.Scalars['String']['input'];
  description?: Types.InputMaybe<Types.Scalars['String']['input']>;
  default?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  enabled?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type Admin__Core_Plugins__EditMutation = { __typename?: 'Mutation', admin__core_plugins__edit: { __typename?: 'ShowAdminPlugins', id: number, name: string } };


export const Admin__Core_Plugins__Edit = gql`
    mutation Admin__core_plugins__edit($author: String!, $authorUrl: String, $code: String!, $name: String!, $supportUrl: String!, $description: String, $default: Boolean, $enabled: Boolean) {
  admin__core_plugins__edit(
    author: $author
    author_url: $authorUrl
    code: $code
    name: $name
    support_url: $supportUrl
    description: $description
    default: $default
    enabled: $enabled
  ) {
    id
    name
  }
}
    `;