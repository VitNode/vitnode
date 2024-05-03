"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Editor_Files__Upload,
  type Core_Editor_Files__UploadMutation,
  type Core_Editor_Files__UploadMutationVariables
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

    return { data };
  } catch (error) {
    return { error };
  }
};
