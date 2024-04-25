import { Paperclip } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { mutationApi } from "./mutation-api";
import type { ErrorType } from "@/graphql/fetcher";
import type { Core_Files__UploadMutation } from "@/graphql/hooks";

export interface FileStateEditor {
  file: File;
  id: number;
  isLoading: boolean;
  data?: Core_Files__UploadMutation["core_files__upload"];
  error?: string;
}

interface Props {
  setFiles: Dispatch<SetStateAction<FileStateEditor[]>>;
}

export const FilesButtonFooterEditor = ({ setFiles }: Props) => {
  const t = useTranslations("core.editor");
  const tCore = useTranslations("core");
  const ref = useRef<HTMLInputElement>(null);

  const handleUpload = async ({ file, id }: { file: File; id: number }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("plugin", "core");
    formData.append("folder", "testing");
    const mutation = await mutationApi(formData);

    const error = mutation.error as ErrorType | undefined;

    if (error || !mutation.data) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }

    setFiles(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            data: mutation.data.core_files__upload,
            isLoading: false,
            id: mutation.data.core_files__upload.id
          };
        }

        return item;
      })
    );
  };

  const onHandleUpload = async (files: FileStateEditor[]) => {
    await Promise.all(
      files.map(async file => {
        await handleUpload(file);
      })
    );
  };

  return (
    <>
      <Button variant="ghost" onClick={() => ref.current?.click()}>
        <Paperclip /> {t("files.attach")}
      </Button>
      <input
        type="file"
        className="hidden"
        ref={ref}
        onChange={async e => {
          const newFiles: FileStateEditor[] = [...(e.target.files ?? [])].map(
            file => ({
              file,
              isLoading: true,
              id: Math.floor(Math.random() * 1000) + file.size
            })
          );

          setFiles(prev => [...prev, ...newFiles]);

          onHandleUpload(newFiles);
        }}
        multiple
        value=""
      />
    </>
  );
};
