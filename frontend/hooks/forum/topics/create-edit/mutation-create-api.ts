"use server";

import { revalidateTag } from "next/cache";

import {
  Forum_Topics__Create,
  type Forum_Topics__CreateMutation,
  type Forum_Topics__CreateMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationCreateApi = async (
  variables: Forum_Topics__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Forum_Topics__CreateMutation,
      Forum_Topics__CreateMutationVariables
    >({
      query: Forum_Topics__Create,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
