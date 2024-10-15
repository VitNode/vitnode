import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Staff_Administrators__CreateMutationVariables = Types.Exact<{
  groupId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  userId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  unrestricted: Types.Scalars['Boolean']['input'];
  permissions?: Types.InputMaybe<Array<Types.PermissionsStaffArgs> | Types.PermissionsStaffArgs>;
}>;


export type Admin__Core_Staff_Administrators__CreateMutation = { __typename?: 'Mutation', admin__core_staff_administrators__create: { __typename?: 'ShowAdminStaffAdministrators', id: number } };


export const Admin__Core_Staff_Administrators__Create = gql`
    mutation Admin__core_staff_administrators__create($groupId: Int, $userId: Int, $unrestricted: Boolean!, $permissions: [PermissionsStaffArgs!]) {
  admin__core_staff_administrators__create(
    group_id: $groupId
    user_id: $userId
    unrestricted: $unrestricted
    permissions: $permissions
  ) {
    id
  }
}
    `;