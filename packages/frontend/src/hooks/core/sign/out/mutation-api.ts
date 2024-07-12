'use server';

import { revalidatePath } from 'next/cache';

import {
  Core_Sessions__Sign_Out,
  Core_Sessions__Sign_OutMutation,
  Core_Sessions__Sign_OutMutationVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';
import { redirect } from '@/navigation';

export const mutationApi = async () => {
  await fetcher<
    Core_Sessions__Sign_OutMutation,
    Core_Sessions__Sign_OutMutationVariables
  >({
    query: Core_Sessions__Sign_Out,
  });

  revalidatePath('/', 'layout');
  redirect('/');
};
