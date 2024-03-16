"use client";

import { useTranslations } from "next-intl";

import { useSessionAdmin } from "@/admin/core/hooks/use-session-admin";

export const VersionDashboardCoreAdmin = () => {
  const t = useTranslations("core");
  const { version } = useSessionAdmin();

  return t("version", { version });
};
