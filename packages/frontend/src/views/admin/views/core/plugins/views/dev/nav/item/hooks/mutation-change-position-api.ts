'use server';

import { revalidatePath } from 'next/cache';

import {
  Admin__Core_Plugins__Nav__Change_Position,
  Admin__Core_Plugins__Nav__Change_PositionMutation,
  Admin__Core_Plugins__Nav__Change_PositionMutationVariables,
} from '../../../../../../../../../../graphql/code';
import { fetcher } from '../../../../../../../../../../graphql/fetcher';

export const mutationChangePositionApi = async (
  variables: Admin__Core_Plugins__Nav__Change_PositionMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__Nav__Change_PositionMutation,
      Admin__Core_Plugins__Nav__Change_PositionMutationVariables
    >({
      query: Admin__Core_Plugins__Nav__Change_Position,
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
