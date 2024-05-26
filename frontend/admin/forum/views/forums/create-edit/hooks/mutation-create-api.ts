"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Forum_Forums__Create,
  Admin__Forum_Forums__CreateMutation,
  Admin__Forum_Forums__CreateMutationVariables
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

    revalidatePath("/admin/forum/forums", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
