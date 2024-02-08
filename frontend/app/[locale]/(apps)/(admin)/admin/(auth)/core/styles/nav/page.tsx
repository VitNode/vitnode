import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

import { NavAdminView } from "@/admin/core/views/core/styles/nav/nav-admin-view";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Nav__Show,
  type Admin__Core_Nav__ShowQuery,
  type Admin__Core_Nav__ShowQueryVariables
} from "@/graphql/hooks";

interface Props {
  params: {
    locale: string;
  };
}

const getData = async () => {
  const { data } = await fetcher<
    Admin__Core_Nav__ShowQuery,
    Admin__Core_Nav__ShowQueryVariables
  >({
    query: Admin__Core_Nav__Show,
    headers: {
      Cookie: cookies().toString()
    }
  });

  return data;
};

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "admin.core.styles.nav"
  });

  return {
    title: t("title")
  };
}

export default async function Page() {
  const data = await getData();

  return <NavAdminView {...data} />;
}
