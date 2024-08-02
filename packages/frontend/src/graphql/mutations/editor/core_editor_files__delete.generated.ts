import * as Types from '../../types';

import gql from 'graphql-tag';
export type Core_Editor_Files__DeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  securityKey?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Core_Editor_Files__DeleteMutation = { __typename?: 'Mutation', core_editor_files__delete: string };


export const Core_Editor_Files__Delete = gql`
    mutation Core_editor_files__delete($id: Int!, $securityKey: String) {
  core_editor_files__delete(id: $id, security_key: $securityKey)
}
    `;