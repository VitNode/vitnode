import * as React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "vitnode-frontend/navigation";

import { Providers } from "./providers";
import { getConfigFile } from "@/config/helpers";
import { AdminLayout } from "@/plugins/admin/layout/admin-layout";
import { getSessionAdminData } from "./get-session-admin";

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const [config, t] = await Promise.all([
    getConfigFile(),
    getTranslations("admin"),
  ]);

  const defaultTitle = `${t("title_short")} - ${config.settings.general.site_name}`;

  return {
    title: {
      default: defaultTitle,
      template: `%s - ${defaultTitle}`,
    },
  };
}

export default async function Layout({ children }: Props) {
  try {
    const data = await getSessionAdminData();
    if (!data) {
      return redirect("/admin");
    }

    return (
      <Providers data={data}>
        <AdminLayout>{children}</AdminLayout>
      </Providers>
    );
  } catch (error) {
    if (isRedirectError(error)) {
      redirect("/admin");
    }

    throw error;
  }
}
