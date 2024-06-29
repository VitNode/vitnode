'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '../../../../../../../../../graphql/fetcher';
import {
  Admin__Core_Staff_Moderators__Delete,
  Admin__Core_Staff_Moderators__DeleteMutation,
  Admin__Core_Staff_Moderators__DeleteMutationVariables,
} from '../../../../../../../../../graphql/graphql';

export const mutationApi = async (
  variables: Admin__Core_Staff_Moderators__DeleteMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Staff_Moderators__DeleteMutation,
      Admin__Core_Staff_Moderators__DeleteMutationVariables
    >({
      query: Admin__Core_Staff_Moderators__Delete,
      variables,
    });

    revalidatePath('/', 'layout');

    return { data };
  } catch (error) {
    return { error };
  }
};
