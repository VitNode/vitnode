import { getTranslations } from "next-intl/server";
import * as React from "react";
import { Metadata } from "next";

import { getConfigFile } from "@/config/helpers";

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const [t, tCore, config] = await Promise.all([
    getTranslations("admin"),
    getTranslations("core.admin"),
    getConfigFile(),
  ]);

  const defaultTitle = `${tCore("nav.styles")} - ${t("title_short")} - ${config.settings.general.site_name}`;

  return {
    title: {
      template: `%s - ${defaultTitle}`,
      absolute: defaultTitle,
    },
  };
}

export default async function Layout({ children }: Props) {
  return children;
}
