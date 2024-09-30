'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Members__Edit,
  Admin__Core_Members__EditMutation,
  Admin__Core_Members__EditMutationVariables,
} from '@/graphql/mutations/admin/members/users/user/admin__core_members__edit.generated';
import { revalidateTags } from '@/graphql/revalidate-tags';

export const mutationApi = async (
  variables: Admin__Core_Members__EditMutationVariables,
) => {
  try {
    await fetcher<
      Admin__Core_Members__EditMutation,
      Admin__Core_Members__EditMutationVariables
    >({
      query: Admin__Core_Members__Edit,
      variables,
    });

    revalidateTags.session(variables.id);
    revalidateTags.sessionAdmin(variables.id);
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};
