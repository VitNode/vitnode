"use server";

import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Plugins__Upload,
  type Admin__Core_Plugins__UploadMutation,
  type Admin__Core_Plugins__UploadMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (formData: FormData) => {
  try {
    const files = formData.get("file") as File;

    const { data } = await fetcher<
      Admin__Core_Plugins__UploadMutation,
      Admin__Core_Plugins__UploadMutationVariables
    >({
      query: Admin__Core_Plugins__Upload,
      uploads: [
        {
          files,
          variable: "file"
        }
      ]
    });

    revalidatePath("/admin/core/plugins", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
