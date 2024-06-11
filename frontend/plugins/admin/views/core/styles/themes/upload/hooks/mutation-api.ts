"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import {
  Admin__Core_Themes__Upload,
  Admin__Core_Themes__UploadMutation,
  Admin__Core_Themes__UploadMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";
import { CoreApiTags } from "@/plugins/admin/api-tags";

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

    revalidateTag(CoreApiTags.Core_Sessions__Authorization);
    revalidatePath("/admin/core/styles/themes", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
