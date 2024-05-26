import * as React from "react";
import { useTranslations } from "next-intl";

import { Tabs } from "@/components/tabs/tabs";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";

interface Props {
  children: React.ReactNode;
}

export const StaffAdminLayout = ({ children }: Props) => {
  const t = useTranslations("admin.members.staff");

  return (
    <>
      <Tabs className="mb-5">
        <TabsTrigger id="moderators" href="/admin/members/staff/moderators">
          {t("moderators.title")}
        </TabsTrigger>
        <TabsTrigger
          id="administrators"
          href="/admin/members/staff/administrators"
        >
          {t("administrators.title")}
        </TabsTrigger>
      </Tabs>

      {children}
    </>
  );
};
