"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Topics__Actions__Lock_Toggle,
  type Forum_Topics__Actions__Lock_ToggleMutation,
  type Forum_Topics__Actions__Lock_ToggleMutationVariables
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
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidateTag("Forum_Topics__Show");

    return { data };
  } catch (error) {
    return { error };
  }
};
