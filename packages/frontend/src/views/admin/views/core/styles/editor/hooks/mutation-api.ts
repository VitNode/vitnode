'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Styles__Editor__Edit,
  Admin__Core_Styles__Editor__EditMutation,
  Admin__Core_Styles__Editor__EditMutationVariables,
} from '@/graphql/graphql';

export const mutationApi = async (
  variables: Admin__Core_Styles__Editor__EditMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Styles__Editor__EditMutation,
      Admin__Core_Styles__Editor__EditMutationVariables
    >({
      query: Admin__Core_Styles__Editor__Edit,
      variables,
    });

    revalidatePath('/', 'layout');

    return { data };
  } catch (error) {
    return { error };
  }
};
