"use server";

import {
  Core_Editor_Files__Delete,
  Core_Editor_Files__DeleteMutation,
  Core_Editor_Files__DeleteMutationVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

export const deleteMutationApi = async (
  variables: Core_Editor_Files__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Core_Editor_Files__DeleteMutation,
      Core_Editor_Files__DeleteMutationVariables
    >({
      query: Core_Editor_Files__Delete,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
