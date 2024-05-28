/* eslint-disable no-console */
import { Metadata } from "next";
import * as React from "react";

import { getConfigFile } from "@/config/helpers";

import "./_supressLogs";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfigFile();
  const defaultTitle = config.settings.general.site_name;

  return {
    title: {
      default: defaultTitle,
      template: `%s - ${defaultTitle}`
    },
    icons: {
      icon: "/icons/favicon.ico"
    }
  };
}

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  if (process.env.NEXT_PUBLIC_DEBUG === "true") {
    console.log(
      "NEXT_PUBLIC_FRONTEND_URL",
      process.env.NEXT_PUBLIC_FRONTEND_URL
    );
    console.log("NEXT_PUBLIC_BACKEND_URL", process.env.NEXT_PUBLIC_BACKEND_URL);
    console.log("NEXT_PUBLIC_GRAPHQL_URL", process.env.NEXT_PUBLIC_GRAPHQL_URL);
  }

  return children;
}
