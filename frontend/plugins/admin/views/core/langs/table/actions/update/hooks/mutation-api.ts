"use server";

import { revalidatePath } from "next/cache";

import {
  Admin__Core_Languages__UpdateMutation,
  Admin__Core_Languages__Update,
  Admin__Core_Languages__UpdateMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationApi = async (formData: FormData) => {
  try {
    const files = formData.get("file") as File;
    const code = formData.get("code") as string;

    const { data } = await fetcher<
      Admin__Core_Languages__UpdateMutation,
      Omit<Admin__Core_Languages__UpdateMutationVariables, "file">
    >({
      query: Admin__Core_Languages__Update,
      uploads: [
        {
          files,
          variable: "file"
        }
      ],
      variables: {
        code
      }
    });

    revalidatePath("/admin/core/langs", "page");

    return { data };
  } catch (error) {
    return { error };
  }
};
