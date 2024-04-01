"use server";

import { revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Posts__Create,
  type Forum_Posts__CreateMutation,
  type Forum_Posts__CreateMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Forum_Posts__CreateMutationVariables
): Promise<{
  data?: Forum_Posts__CreateMutation;
  error?: unknown;
}> => {
  try {
    const { data } = await fetcher<
      Forum_Posts__CreateMutation,
      Forum_Posts__CreateMutationVariables
    >({
      query: Forum_Posts__Create,
      variables
    });

    revalidateTag("Forum_Forums__Show");
    revalidateTag("Forum_Forums__Show_Item");
    revalidateTag("Forum_Topics__Show");

    return { data };
  } catch (error) {
    return { error };
  }
};
