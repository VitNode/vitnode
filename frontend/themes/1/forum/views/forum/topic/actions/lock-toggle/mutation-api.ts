"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Topics__Actions__Lock_Toggle,
  Forum_Topics__Actions__Lock_ToggleMutation,
  Forum_Topics__Actions__Lock_ToggleMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Forum_Topics__Actions__Lock_ToggleMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Forum_Topics__Actions__Lock_ToggleMutation,
      Forum_Topics__Actions__Lock_ToggleMutationVariables
    >({
      query: Forum_Topics__Actions__Lock_Toggle,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
