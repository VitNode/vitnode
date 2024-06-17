import * as React from "react";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "@vitnode/frontend/navigation";

import { SessionProvider } from "./session-provider";
import { TextLanguage } from "@/graphql/hooks";
import { InternalErrorView } from "@/plugins/admin/global/internal-error/internal-error-view";
import { getSessionData } from "@/graphql/get-session-data";

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function Layout({ children }: Props) {
  try {
    const { data, theme_id } = await getSessionData();
    if (data.core_languages__show.edges.length === 0) {
      redirect("/admin/install");
    }

    const Layout: React.LazyExoticComponent<
      ({
        children
      }: {
        children: React.ReactNode;
        copyright?: TextLanguage[];
      }) => JSX.Element
    > = React.lazy(async () =>
      import(`../../../themes/${theme_id}/core/layout/layout`).catch(
        async () => import("../../../themes/1/core/layout/layout")
      )
    );

    return (
      <SessionProvider data={data}>
        <Layout copyright={data.core_settings__show.site_copyright}>
          {children}
        </Layout>
      </SessionProvider>
    );
  } catch (error) {
    // Redirect from catch
    if (isRedirectError(error)) {
      redirect("/admin/install");
    }

    return <InternalErrorView />;
  }
}
