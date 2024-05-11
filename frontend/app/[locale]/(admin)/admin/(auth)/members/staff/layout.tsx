import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { StaffAdminLayout } from "@/admin/core/views/members/staff/staff-admin-layout";
import { getConfigFile } from "@/config/helpers";

interface Props {
  children: ReactNode;
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
