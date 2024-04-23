import { Paperclip } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, type Dispatch, type SetStateAction } from "react";

import { Button } from "@/components/ui/button";

interface Props {
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export const FilesButtonFooterEditor = ({ setFiles }: Props) => {
  const t = useTranslations("core.editor");
  const ref = useRef<HTMLInputElement>(null);

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
          setFiles(prev => [...prev, ...Array.from(e.target.files ?? [])]);
        }}
        multiple
        value=""
      />
    </>
  );
};
