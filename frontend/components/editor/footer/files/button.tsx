import { Paperclip } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { Button } from "@/components/ui/button";

import type { FileStateEditor } from "../../extensions/files/files";
import { useEditorState } from "../../hooks/use-editor-state";

export const FilesButtonFooterEditor = () => {
  const t = useTranslations("core.editor");
  const ref = useRef<HTMLInputElement>(null);
  const { uploadFiles } = useEditorState();

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
          const files: FileStateEditor[] = [...(e.target.files ?? [])].map(
            file => ({
              file,
              isLoading: true,
              id: Math.floor(Math.random() * 1000) + file.size
            })
          );

          await uploadFiles({ files });
        }}
        multiple
        value=""
      />
    </>
  );
};
