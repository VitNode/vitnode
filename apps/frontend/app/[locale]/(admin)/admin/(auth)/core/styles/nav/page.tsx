import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  Admin__Core_Nav__Show,
  Admin__Core_Nav__ShowQuery,
  Admin__Core_Nav__ShowQueryVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";
import { NavAdminView } from "@/plugins/admin/views/core/styles/nav/nav-admin-view";

const getData = async () => {
  const { data } = await fetcher<
    Admin__Core_Nav__ShowQuery,
    Admin__Core_Nav__ShowQueryVariables
  >({
    query: Admin__Core_Nav__Show
  });

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.styles.nav");

  return {
    title: t("title")
  };
}

export default async function Page() {
  const data = await getData();

  return <NavAdminView {...data} />;
}
