import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Tabs } from "@/components/tabs/tabs";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";

interface Props {
  children: ReactNode;
}

export const StylesAdminLayout = ({ children }: Props) => {
  const t = useTranslations("admin.core.styles");

  return (
    <>
      <Tabs className="mb-5">
        <TabsTrigger id="themes" href="/admin/core/styles/themes">
          {t("themes.title")}
        </TabsTrigger>
        <TabsTrigger id="nav" href="/admin/core/styles/nav">
          {t("nav.title")}
        </TabsTrigger>
      </Tabs>

      {children}
    </>
  );
};
