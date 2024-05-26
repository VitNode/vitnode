"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Blog_Categories__CreateMutation,
  Admin__Blog_Categories__Create,
  Admin__Blog_Categories__CreateMutationVariables
} from "@/graphql/hooks";

export const mutationCreateApi = async (
  variables: Admin__Blog_Categories__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Blog_Categories__CreateMutation,
      Admin__Blog_Categories__CreateMutationVariables
    >({
      query: Admin__Blog_Categories__Create,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
