import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Authorization_Settings__EditMutationVariables = Types.Exact<{
  forceLogin: Types.Scalars['Boolean']['input'];
}>;


export type Admin__Core_Authorization_Settings__EditMutation = { __typename?: 'Mutation', admin__core_authorization_settings__edit: { __typename?: 'ShowAdminAuthorizationSettingsObj', force_login: boolean } };


export const Admin__Core_Authorization_Settings__Edit = gql`
    mutation Admin__core_authorization_settings__edit($forceLogin: Boolean!) {
  admin__core_authorization_settings__edit(force_login: $forceLogin) {
    force_login
  }
}
    `;