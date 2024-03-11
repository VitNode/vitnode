import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export const SetDefaultPluginActionsAdmin = () => {
  const t = useTranslations("admin.core.plugins");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" ariaLabel={t("set_default")}>
            <Star />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t("set_default")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
