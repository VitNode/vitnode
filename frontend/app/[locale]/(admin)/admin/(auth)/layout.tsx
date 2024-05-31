import * as React from "react";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { isRedirectError } from "next/dist/client/components/redirect";

import { Providers } from "./providers";
import { redirect } from "@/utils/i18n";
import {
  Admin__Sessions__Authorization,
  Admin__Sessions__AuthorizationQuery,
  Admin__Sessions__AuthorizationQueryVariables
} from "@/utils/graphql/hooks";
import { getConfigFile } from "@/config/helpers";
import { fetcher } from "@/utils/graphql/fetcher";
import { AdminLayout } from "@/plugins/core/admin/layout/admin-layout";

const getData = async () => {
  const cookieStore = cookies();

  if (!cookieStore.get("vitnode-login-token-admin")) {
    return;
  }

  const { data } = await fetcher<
    Admin__Sessions__AuthorizationQuery,
    Admin__Sessions__AuthorizationQueryVariables
  >({
    query: Admin__Sessions__Authorization
  });

  return data;
};

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const [config, t] = await Promise.all([
    getConfigFile(),
    getTranslations("admin")
  ]);

  const defaultTitle = `${t("title_short")} - ${config.settings.general.site_name}`;

  return {
    title: {
      default: defaultTitle,
      template: `%s - ${defaultTitle}`
    }
  };
}

export default async function Layout({ children }: Props) {
  try {
    const data = await getData();
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
