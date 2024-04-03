"use server";

import { revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Posts__Delete,
  type Forum_Posts__DeleteMutation,
  type Forum_Posts__DeleteMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Forum_Posts__DeleteMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Forum_Posts__DeleteMutation,
      Forum_Posts__DeleteMutationVariables
    >({
      query: Forum_Posts__Delete,
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
