import { AudioLinesIcon } from "lucide-react";
import React from "react";
import { useTranslations } from "use-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "@/components/ui/loader";
import { TooltipWithContent } from "@/components/ui/tooltip";

const AudioForm = React.lazy(async () =>
  import("./audio/audio-form").then(module => ({
    default: module.AudioForm,
  })),
);

export const AudioAction = () => {
  const t = useTranslations("core.global.editor.audio");

  return (
    <Dialog>
      <TooltipWithContent text={t("label")}>
        <DialogTrigger
          render={
            <Button aria-label={t("label")} size="icon-sm" variant="ghost" />
          }
        >
          <AudioLinesIcon />
        </DialogTrigger>
      </TooltipWithContent>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AudioLinesIcon className="size-5" />
            {t("title")}
          </DialogTitle>
          <DialogDescription>{t("desc")}</DialogDescription>
        </DialogHeader>

        <React.Suspense fallback={<Loader />}>
          <AudioForm />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
