import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Card } from "vitnode-frontend/components/ui/card";

import { HeaderContent } from "@/components/header-content/header-content";
import { EmailSettingsAdminView } from "@/plugins/admin/views/core/settings/email/email-settings-admin-view";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Email_Settings__Show,
  Admin__Core_Email_Settings__ShowQuery,
  Admin__Core_Email_Settings__ShowQueryVariables,
} from "@/graphql/hooks";
import { ActionsEmailSettingsAdmin } from "@/plugins/admin/views/core/settings/email/actions/actions";

const getData = async () => {
  const { data } = await fetcher<
    Admin__Core_Email_Settings__ShowQuery,
    Admin__Core_Email_Settings__ShowQueryVariables
  >({
    query: Admin__Core_Email_Settings__Show,
  });

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("core.admin.nav");

  return {
    title: t("settings_email"),
  };
}

export default async function Page() {
  const [t, data] = await Promise.all([
    getTranslations("core.admin.nav"),
    getData(),
  ]);

  return (
    <>
      <HeaderContent h1={t("settings_email")}>
        <ActionsEmailSettingsAdmin />
      </HeaderContent>

      <Card className="p-6">
        <EmailSettingsAdminView {...data} />
      </Card>
    </>
  );
}
