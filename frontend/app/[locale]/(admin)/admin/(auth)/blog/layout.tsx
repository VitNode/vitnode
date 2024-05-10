import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { getConfigFile } from "@/config/get-config-file";

interface Props {
  children: ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const [config, t, tAdmin] = await Promise.all([
    getConfigFile(),
    getTranslations("blog.admin.nav"),
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

export default function Layout({ children }: Props) {
  return children;
}
