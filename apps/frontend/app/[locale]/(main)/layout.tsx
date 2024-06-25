import * as React from "react";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "vitnode-frontend/navigation";
import { InternalErrorView } from "vitnode-frontend/views/global";

import { SessionProvider } from "./session-provider";
import { getSessionData } from "@/graphql/get-session-data";
import { Layout as LayoutCore } from "@/plugins/core/templates/layout/layout";

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function Layout({ children }: Props) {
  try {
    const { data } = await getSessionData();
    if (data.core_languages__show.edges.length === 0) {
      redirect("/admin/install");
    }

    return (
      <SessionProvider data={data}>
        <LayoutCore copyright={data.core_settings__show.site_copyright}>
          {children}
        </LayoutCore>
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
