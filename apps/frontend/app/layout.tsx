/* eslint-disable no-console */
import { Metadata } from "next";
import * as React from "react";

import { getConfigFile } from "@/config/helpers";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfigFile();
  const defaultTitle = config.settings.general.site_name;

  return {
    title: {
      default: defaultTitle,
      template: `%s - ${defaultTitle}`,
    },
    icons: {
      icon: "/icons/favicon.ico",
    },
  };
}

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  return children;
}
