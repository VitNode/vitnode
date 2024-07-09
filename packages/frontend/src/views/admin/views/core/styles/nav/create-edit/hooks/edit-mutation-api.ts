'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Styles__Nav__Edit,
  Admin__Core_Styles__Nav__EditMutation,
  Admin__Core_Styles__Nav__EditMutationVariables,
} from '@/graphql/graphql';

export const editMutationApi = async (
  variables: Admin__Core_Styles__Nav__EditMutationVariables,
) => {
  await fetcher<
    Admin__Core_Styles__Nav__EditMutation,
    Admin__Core_Styles__Nav__EditMutationVariables
  >({
    query: Admin__Core_Styles__Nav__Edit,
    variables,
  });

  revalidatePath('/', 'layout');
};
