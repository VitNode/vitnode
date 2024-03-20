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

    revalidateTag("Forum_Forums__Show");
    revalidateTag("Forum_Forums__Show_Item");
    revalidateTag("Forum_Topics__Show");

    return { data };
  } catch (error) {
    return { error };
  }
};
