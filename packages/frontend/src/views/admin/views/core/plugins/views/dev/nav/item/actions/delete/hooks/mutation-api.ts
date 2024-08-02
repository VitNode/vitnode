'use server';

import { revalidatePath } from 'next/cache';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Nav__Delete,
  Admin__Core_Plugins__Nav__DeleteMutation,
  Admin__Core_Plugins__Nav__DeleteMutationVariables,
} from '@/graphql/mutations/admin/plugins/dev/nav/admin__core_plugins__nav__delete.generated';

interface Args extends Admin__Core_Plugins__Nav__DeleteMutationVariables {
  pluginCode: string;
}

export const mutationApi = async (variables: Args) => {
  try {
    await fetcher<
      Admin__Core_Plugins__Nav__DeleteMutation,
      Admin__Core_Plugins__Nav__DeleteMutationVariables
    >({
      query: Admin__Core_Plugins__Nav__Delete,
      variables,
    });
  } catch (e) {
    return { error: e as FetcherErrorType };
  }

  revalidatePath('/[locale]/admin/(auth)/(vitnode)', 'layout');
};
