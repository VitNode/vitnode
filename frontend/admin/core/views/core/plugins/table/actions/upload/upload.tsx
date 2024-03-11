import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export const UploadPluginActionsAdmin = () => {
  const t = useTranslations("core");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            ariaLabel={t("upload_new_version")}
          >
            <Upload />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t("upload_new_version")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
