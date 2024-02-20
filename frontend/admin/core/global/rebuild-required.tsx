"use client";

import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const RebuildRequiredAdmin = () => {
  const t = useTranslations("admin.rebuild_required");

  return (
    <Alert variant="destructive">
      <RefreshCcw />

      <AlertTitle>{t("title")}</AlertTitle>
      <AlertDescription>{t("desc")}</AlertDescription>
      <AlertDescription>{t("this_process")}</AlertDescription>

      <div className="mt-2">
        <Button variant="outline">{t("submit")}</Button>
      </div>
    </Alert>
  );
};
