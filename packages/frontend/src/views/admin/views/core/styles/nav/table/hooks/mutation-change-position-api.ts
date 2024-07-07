'use server';

import { revalidatePath } from 'next/cache';

import { fetcher } from '../../../../../../../../graphql/fetcher';
import {
  Admin__Core_Nav_Styles__Change_Position,
  Admin__Core_Nav_Styles__Change_PositionMutation,
  Admin__Core_Nav_Styles__Change_PositionMutationVariables,
} from '../../../../../../../../graphql/graphql';

export const mutationChangePositionApi = async (
  variables: Admin__Core_Nav_Styles__Change_PositionMutationVariables,
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Nav_Styles__Change_PositionMutation,
      Admin__Core_Nav_Styles__Change_PositionMutationVariables
    >({
      query: Admin__Core_Nav_Styles__Change_Position,
      variables,
    });

    revalidatePath('/', 'layout');

    return { data };
  } catch (error) {
    return { error };
  }
};
