import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getConfigFile } from "@/config/get-config-file";

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
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return children;
}
