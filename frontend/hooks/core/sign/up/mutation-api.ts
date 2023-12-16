'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Members__Sign_Up,
  Core_Members__Sign_UpMutation,
  Core_Members__Sign_UpMutationVariables
} from '@/graphql/hooks';

interface Args {
  variables: Core_Members__Sign_UpMutationVariables;
  installPage?: boolean;
}

export const mutationApi = async ({ installPage, variables }: Args) => {
  const mutation = fetcher<Core_Members__Sign_UpMutation, Core_Members__Sign_UpMutationVariables>({
    query: Core_Members__Sign_Up,
    variables,
    headers: {
      Cookie: cookies().toString()
    }
  });

  if (installPage) {
    revalidatePath('/admin/(configs)/install/', 'layout');
  }

  return mutation;
};
