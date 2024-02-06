"use server";

import { cookies } from "next/headers";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Themes__Change,
  type Core_Themes__ChangeMutation,
  type Core_Themes__ChangeMutationVariables
} from "@/graphql/hooks";
import { setCookieFromApi } from "@/functions/cookie-from-string-to-object";

export const mutationApi = async (
  variables: Core_Themes__ChangeMutationVariables
) => {
  try {
    const { data, res } = await fetcher<
      Core_Themes__ChangeMutation,
      Core_Themes__ChangeMutationVariables
    >({
      query: Core_Themes__Change,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    // Set cookie
    setCookieFromApi({ res });

    return { data };
  } catch (error) {
    return { error };
  }
};
