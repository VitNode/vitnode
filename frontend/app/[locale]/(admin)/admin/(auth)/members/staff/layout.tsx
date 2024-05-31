import * as React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getConfigFile } from "@/config/helpers";
import { StaffAdminLayout } from "@/plugins/core/admin/views/members/staff/staff-admin-layout";

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin");
  const config = await getConfigFile();

  const defaultTitle = `${t("members.staff.title")} - ${t("title_short")} - ${config.settings.general.site_name}`;

  return {
    title: {
      template: `%s - ${defaultTitle}`,
      absolute: defaultTitle
    }
  };
}

export default function Layout({ children }: Props) {
  return <StaffAdminLayout>{children}</StaffAdminLayout>;
}
