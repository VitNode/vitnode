import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { Tabs } from "@/components/tabs/tabs";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const t = await getTranslations("admin.core.styles");

  return (
    <>
      <Tabs className="mb-5">
        <TabsTrigger id="themes" href="/admin/core/styles/themes">
          {t("themes.title")}
        </TabsTrigger>
        <TabsTrigger id="nav" href="/admin/core/styles/nav">
          {t("nav.title")}
        </TabsTrigger>
        <TabsTrigger id="editor" href="/admin/core/styles/editor">
          {t("editor.title")}
        </TabsTrigger>
      </Tabs>

      {children}
    </>
  );
}
