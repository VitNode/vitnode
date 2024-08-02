import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__CreateMutationVariables = Types.Exact<{
  author: Types.Scalars['String']['input'];
  authorUrl?: Types.InputMaybe<Types.Scalars['String']['input']>;
  code: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
  supportUrl: Types.Scalars['String']['input'];
  description?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__CreateMutation = { __typename?: 'Mutation', admin__core_plugins__create: { __typename?: 'ShowAdminPlugins', code: string } };


export const Admin__Core_Plugins__Create = gql`
    mutation Admin__core_plugins__create($author: String!, $authorUrl: String, $code: String!, $name: String!, $supportUrl: String!, $description: String) {
  admin__core_plugins__create(
    author: $author
    author_url: $authorUrl
    code: $code
    name: $name
    support_url: $supportUrl
    description: $description
  ) {
    code
  }
}
    `;