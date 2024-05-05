import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import type { FileStateEditor } from "../files";
import { uploadMutationApi } from "./upload-mutation-api";
import type { ErrorType } from "@/graphql/fetcher";
import type { TextLanguage } from "@/graphql/hooks";
import { getFilesFromContent } from "@/components/editor/extensions/files/hooks/functions";

export interface UploadFilesHandlerArgs {
  files: FileStateEditor[];
  finishUpload?: (file: FileStateEditor) => void;
}

interface Args {
  value: string | TextLanguage[];
}

export const useUploadFilesHandlerEditor = ({ value }: Args) => {
  const [files, setFiles] = useState<FileStateEditor[]>(
    Array.isArray(value) ? getFilesFromContent(value) : []
  );
  const t = useTranslations("core");

  const handleUpload = async ({
    data,
    finishUpload
  }: {
    data: FileStateEditor;
    finishUpload?: (file: FileStateEditor) => void;
  }) => {
    const formData = new FormData();
    if (!data.file) return;
    formData.append("file", data.file);
    formData.append("plugin", "core");
    formData.append("folder", "testing");
    const mutation = await uploadMutationApi(formData);

    const error = mutation.error as ErrorType | undefined;

    if (error || !mutation.data) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    setFiles(prev =>
      prev.map(item => {
        if (item.id === data.id) {
          return {
            ...item,
            data: mutation.data.core_editor_files__upload,
            isLoading: false,
            id: mutation.data.core_editor_files__upload.id
          };
        }

        return item;
      })
    );

    finishUpload?.({
      ...data,
      data: mutation.data.core_editor_files__upload,
      id: mutation.data.core_editor_files__upload.id,
      isLoading: false
    });
  };

  const uploadFiles = async ({
    files,
    finishUpload
  }: UploadFilesHandlerArgs) => {
    setFiles(prev => [...prev, ...files]);

    await Promise.all(
      files.map(async data => {
        await handleUpload({ data, finishUpload });
      })
    );
  };

  return { uploadFiles, files };
};
