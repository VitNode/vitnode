import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Core_Members__Avatar__DeleteMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type Core_Members__Avatar__DeleteMutation = { __typename?: 'Mutation', core_members__avatar__delete: string };


export const Core_Members__Avatar__Delete = gql`
    mutation Core_members__avatar__delete {
  core_members__avatar__delete
}
    `;