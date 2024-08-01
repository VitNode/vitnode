import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Core_Members__Avatar__UploadMutationVariables = Types.Exact<{
  file: Types.Scalars['Upload']['input'];
}>;


export type Core_Members__Avatar__UploadMutation = { __typename?: 'Mutation', core_members__avatar__upload: { __typename?: 'UploadAvatarCoreMembersObj', id: number } };


export const Core_Members__Avatar__Upload = gql`
    mutation Core_members__avatar__upload($file: Upload!) {
  core_members__avatar__upload(file: $file) {
    id
  }
}
    `;