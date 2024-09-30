import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Authorization_Settings__ShowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Admin__Core_Authorization_Settings__ShowQuery = { __typename?: 'Query', admin__core_authorization_settings__show: { __typename?: 'ShowAdminAuthorizationSettingsObj', force_login: boolean, lock_register: boolean, require_confirm_email: boolean, is_email_enabled: boolean } };


export const Admin__Core_Authorization_Settings__Show = gql`
    query Admin__core_authorization_settings__show {
  admin__core_authorization_settings__show {
    force_login
    lock_register
    require_confirm_email
    is_email_enabled
  }
}
    `;