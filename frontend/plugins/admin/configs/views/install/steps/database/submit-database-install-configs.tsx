"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { mutationApi } from "./mutation-api";

export const SubmitDatabaseInstallConfigs = () => {
  const [isPending, setPending] = React.useState(false);
  const t = useTranslations("admin.configs.install.steps.database");
  const tCore = useTranslations("core");

  return (
    <Button
      onClick={async () => {
        setPending(true);

        const mutation = await mutationApi();
        if (mutation?.error) {
          toast.error(tCore("errors.title"), {
            description: tCore("errors.internal_server_error")
          });
        }

        setPending(false);
      }}
      loading={isPending}
    >
      {t("submit")}
    </Button>
  );
};
