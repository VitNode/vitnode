"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Themes__Upload,
  Admin__Core_Themes__UploadMutation,
  Admin__Core_Themes__UploadMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationApi = async (formData: FormData) => {
  try {
    const files = formData.get("file") as File;

    const { data } = await fetcher<
      Admin__Core_Themes__UploadMutation,
      Omit<Admin__Core_Themes__UploadMutationVariables, "file">
    >({
      query: Admin__Core_Themes__Upload,
      variables: {
        id: +(formData.get("id") as string)
      },
      uploads: [
        {
          files,
          variable: "file"
        }
      ]
    });

    revalidatePath("/admin/core/styles/themes", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
