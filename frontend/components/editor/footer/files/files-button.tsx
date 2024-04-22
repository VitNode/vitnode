import { Paperclip } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { Button } from "@/components/ui/button";

export const FilesButtonFooterEditor = () => {
  const t = useTranslations("core.editor");
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button variant="ghost" onClick={() => ref.current?.click()}>
        <Paperclip /> {t("files.attach")}
      </Button>
      <input type="file" className="hidden" ref={ref} />
    </>
  );
};
