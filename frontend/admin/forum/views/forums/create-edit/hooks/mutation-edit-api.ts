"use server";

import { revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Forum_Forums__Edit,
  type Admin__Forum_Forums__EditMutation,
  type Admin__Forum_Forums__EditMutationVariables
} from "@/graphql/hooks";

export const mutationEditApi = async (
  variables: Admin__Forum_Forums__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Forum_Forums__EditMutation,
      Admin__Forum_Forums__EditMutationVariables
    >({
      query: Admin__Forum_Forums__Edit,
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
