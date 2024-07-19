'use server';

import { revalidatePath } from 'next/cache';

import {
  Admin__Core_Styles__Nav__Create,
  Admin__Core_Styles__Nav__CreateMutation,
  Admin__Core_Styles__Nav__CreateMutationVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';

export const createMutationApi = async (
  variables: Admin__Core_Styles__Nav__CreateMutationVariables,
) => {
  await fetcher<
    Admin__Core_Styles__Nav__CreateMutation,
    Admin__Core_Styles__Nav__CreateMutationVariables
  >({
    query: Admin__Core_Styles__Nav__Create,
    variables,
  });

  revalidatePath('/', 'layout');
};
