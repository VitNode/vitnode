"use server";

import { revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Forum_Forums__Create,
  type Admin__Forum_Forums__CreateMutation,
  type Admin__Forum_Forums__CreateMutationVariables
} from "@/graphql/hooks";

export const mutationCreateApi = async (
  variables: Admin__Forum_Forums__CreateMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Forum_Forums__CreateMutation,
      Admin__Forum_Forums__CreateMutationVariables
    >({
      query: Admin__Forum_Forums__Create,
      variables
    });

    revalidateTag("Forum_Forums__Show");

    return { data };
  } catch (error) {
    return { error };
  }
};
