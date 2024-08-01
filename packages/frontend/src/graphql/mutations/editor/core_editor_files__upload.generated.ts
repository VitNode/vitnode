import * as Types from '../../types';

import gql from 'graphql-tag';
export type Core_Editor_Files__UploadMutationVariables = Types.Exact<{
  file: Types.Scalars['Upload']['input'];
  folder: Types.Scalars['String']['input'];
  plugin: Types.Scalars['String']['input'];
}>;


export type Core_Editor_Files__UploadMutation = { __typename?: 'Mutation', core_editor_files__upload: { __typename?: 'ShowCoreFiles', extension: string, file_name: string, file_size: number, mimetype: string, id: number, height?: number, width?: number, dir_folder: string, security_key?: string, file_alt?: string, file_name_original: string } };


export const Core_Editor_Files__Upload = gql`
    mutation core_editor_files__upload($file: Upload!, $folder: String!, $plugin: String!) {
  core_editor_files__upload(file: $file, folder: $folder, plugin: $plugin) {
    extension
    file_name
    file_size
    mimetype
    id
    height
    width
    dir_folder
    security_key
    file_alt
    file_name_original
  }
}
    `;