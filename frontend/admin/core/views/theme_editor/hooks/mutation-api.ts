"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Theme_Editor__Edit,
  Admin__Core_Theme_Editor__EditMutation,
  Admin__Core_Theme_Editor__EditMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Theme_Editor__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Theme_Editor__EditMutation,
      Admin__Core_Theme_Editor__EditMutationVariables
    >({
      query: Admin__Core_Theme_Editor__Edit,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
