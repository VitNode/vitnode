"use server";

import { revalidateTag } from "next/cache";

import { CoreApiTags } from "@/admin/core/api-tags";
import { fetcher } from "@/graphql/fetcher";
import {
  Core_Editor_Files__Upload,
  Core_Editor_Files__UploadMutation,
  Core_Editor_Files__UploadMutationVariables
} from "@/graphql/hooks";

export const uploadMutationApi = async (formData: FormData) => {
  const file = formData.get("file") as File;
  const plugin = formData.get("plugin") as string;
  const folder = formData.get("folder") as string;

  try {
    const { data } = await fetcher<
      Core_Editor_Files__UploadMutation,
      Omit<Core_Editor_Files__UploadMutationVariables, "file">
    >({
      query: Core_Editor_Files__Upload,
      variables: {
        plugin,
        folder
      },
      uploads: [
        {
          files: file,
          variable: "file"
        }
      ]
    });

    revalidateTag(CoreApiTags.Core_Sessions__Authorization);

    return { data };
  } catch (error) {
    return { error };
  }
};
