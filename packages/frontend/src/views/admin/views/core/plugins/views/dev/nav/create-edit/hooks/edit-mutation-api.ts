'use server';

import { revalidatePath } from 'next/cache';

import {
  Admin__Core_Plugins__Nav__Edit,
  Admin__Core_Plugins__Nav__EditMutation,
  Admin__Core_Plugins__Nav__EditMutationVariables,
} from '@/graphql/graphql';
import { fetcher, FetcherErrorType } from '@/graphql/fetcher';

interface Args extends Admin__Core_Plugins__Nav__EditMutationVariables {
  pluginCode: string;
}

export const editMutationApi = async (variables: Args) => {
  try {
    await fetcher<
      Admin__Core_Plugins__Nav__EditMutation,
      Admin__Core_Plugins__Nav__EditMutationVariables
    >({
      query: Admin__Core_Plugins__Nav__Edit,
      variables,
    });
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath(`/admin/core/plugins/${variables.pluginCode}/dev/nav`, 'page');
};
