import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Plugins__UploadMutationVariables = Types.Exact<{
  file: Types.Scalars['Upload']['input'];
  code?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__UploadMutation = { __typename?: 'Mutation', admin__core_plugins__upload: { __typename?: 'ShowAdminPlugins', id: number, name: string } };


export const Admin__Core_Plugins__Upload = gql`
    mutation Admin__core_plugins__upload($file: Upload!, $code: String) {
  admin__core_plugins__upload(file: $file, code: $code) {
    id
    name
  }
}
    `;