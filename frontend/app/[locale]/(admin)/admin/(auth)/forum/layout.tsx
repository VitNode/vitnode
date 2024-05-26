import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

import { getConfigFile } from "@/config/helpers";

interface Props {
  children: ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const [config, t, tAdmin] = await Promise.all([
    getConfigFile(),
    getTranslations("forum.admin.nav"),
    getTranslations("admin")
  ]);

  const defaultTitle = `${t("title")} - ${tAdmin("title_short")} - ${config.settings.general.site_name}`;

  return {
    title: {
      default: defaultTitle,
      template: `%s - ${defaultTitle}`
    }
  };
}

export default async function Layout({ children }: Props) {
  return children;
}
