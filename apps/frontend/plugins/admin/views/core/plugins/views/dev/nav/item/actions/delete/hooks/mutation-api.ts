'use server';

import { revalidatePath } from 'next/cache';
import { fetcher } from 'vitnode-frontend/graphql/fetcher';

import {
  Admin__Core_Plugins__Nav__Delete,
  Admin__Core_Plugins__Nav__DeleteMutation,
  Admin__Core_Plugins__Nav__DeleteMutationVariables,
} from '@/graphql/hooks';

interface Args extends Admin__Core_Plugins__Nav__DeleteMutationVariables {
  pluginCode: string;
}

export const mutationApi = async (variables: Args) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__Nav__DeleteMutation,
      Admin__Core_Plugins__Nav__DeleteMutationVariables
    >({
      query: Admin__Core_Plugins__Nav__Delete,
      variables,
    });

    revalidatePath(
      `/admin/core/plugins/${variables.pluginCode}/dev/nav`,
      'page',
    );

    return { data };
  } catch (error) {
    return { error };
  }
};
