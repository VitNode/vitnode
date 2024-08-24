'use server';

import { fetcher, FetcherErrorType } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Nav__Edit,
  Admin__Core_Plugins__Nav__EditMutation,
  Admin__Core_Plugins__Nav__EditMutationVariables,
} from '@/graphql/mutations/admin/plugins/dev/nav/admin__core_plugins__nav__edit.generated';
import { revalidatePath } from 'next/cache';

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

  revalidatePath('/[locale]/admin/(auth)/(vitnode)', 'layout');
};
