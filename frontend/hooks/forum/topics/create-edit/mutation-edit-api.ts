"use server";

import { revalidateTag } from "next/cache";

import {
  Forum_Topics__Edit,
  type Forum_Topics__EditMutation,
  type Forum_Topics__EditMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationEditApi = async (
  variables: Forum_Topics__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Forum_Topics__EditMutation,
      Forum_Topics__EditMutationVariables
    >({
      query: Forum_Topics__Edit,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};
