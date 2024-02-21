"use client";

import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";

export const RebuildRequiredAdmin = () => {
  const t = useTranslations("admin.rebuild_required");

  return (
    <Alert className="mb-2" variant="destructive">
      <RefreshCcw />

      <AlertTitle>{t("title")}</AlertTitle>
      <AlertDescription>{t("desc")}</AlertDescription>
      <AlertDescription>{t("why")}</AlertDescription>

      <div className="mt-2">
        <a
          href="https://vitnode.com/help/rebuild"
          rel="noopener noreferrer"
          target="_blank"
          className={buttonVariants({
            variant: "outline"
          })}
        >
          {t("submit")}
        </a>
      </div>
    </Alert>
  );
};
