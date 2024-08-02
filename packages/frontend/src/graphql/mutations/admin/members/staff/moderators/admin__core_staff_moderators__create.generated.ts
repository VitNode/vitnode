import * as Types from '../../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Staff_Moderators__CreateMutationVariables = Types.Exact<{
  groupId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  userId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  unrestricted: Types.Scalars['Boolean']['input'];
}>;


export type Admin__Core_Staff_Moderators__CreateMutation = { __typename?: 'Mutation', admin__core_staff_moderators__create: { __typename?: 'ShowAdminStaffModerators', id: number } };


export const Admin__Core_Staff_Moderators__Create = gql`
    mutation Admin__core_staff_moderators__create($groupId: Int, $userId: Int, $unrestricted: Boolean!) {
  admin__core_staff_moderators__create(
    group_id: $groupId
    user_id: $userId
    unrestricted: $unrestricted
  ) {
    id
  }
}
    `;