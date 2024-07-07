'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '../../../../../../../../../../graphql/fetcher';
import {
  Admin__Core_Styles__Nav__Delete,
  Admin__Core_Styles__Nav__DeleteMutation,
  Admin__Core_Styles__Nav__DeleteMutationVariables,
} from '../../../../../../../../../../graphql/graphql';

export const mutationApi = async (
  variables: Admin__Core_Styles__Nav__DeleteMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Styles__Nav__DeleteMutation,
      Admin__Core_Styles__Nav__DeleteMutationVariables
    >({
      query: Admin__Core_Styles__Nav__Delete,
      variables,
    });

    revalidatePath('/', 'layout');

    return { data };
  } catch (error) {
    return { error };
  }
};
