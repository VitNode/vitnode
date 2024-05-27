"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Manifest_Metadata__Edit,
  Admin__Core_Manifest_Metadata__EditMutation,
  Admin__Core_Manifest_Metadata__EditMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (
  variables: Admin__Core_Manifest_Metadata__EditMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Manifest_Metadata__EditMutation,
      Admin__Core_Manifest_Metadata__EditMutationVariables
    >({
      query: Admin__Core_Manifest_Metadata__Edit,
      variables
    });

    revalidatePath("/admin/core/metadata/manifest", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
