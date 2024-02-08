"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Themes__Upload,
  type Admin__Core_Themes__UploadMutation,
  type Admin__Core_Themes__UploadMutationVariables
} from "@/graphql/hooks";

export const mutationApi = async (formData: FormData) => {
  try {
    const files = formData.get("file") as File;

    const { data } = await fetcher<
      Admin__Core_Themes__UploadMutation,
      Admin__Core_Themes__UploadMutationVariables
    >({
      query: Admin__Core_Themes__Upload,
      uploads: [
        {
          files,
          variable: "file"
        }
      ],
      headers: {
        Cookie: cookies().toString()
      }
    });

    revalidatePath("/admin/core/styles/themes", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
