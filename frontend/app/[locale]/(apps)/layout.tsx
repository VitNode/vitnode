import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";

import { LanguageProvider } from "./language-provider";
import { fetcher } from "@/graphql/fetcher";
import {
  Core_Middleware,
  type Core_MiddlewareQuery,
  type Core_MiddlewareQueryVariables
} from "@/graphql/hooks";
import { InternalErrorView } from "@/admin/core/global/internal-error-view";

const getData = async () => {
  const { data } = await fetcher<
    Core_MiddlewareQuery,
    Core_MiddlewareQueryVariables
  >({
    query: Core_Middleware,
    headers: {
      Cookie: cookies().toString(),
      ["user-agent"]: headers().get("user-agent") ?? "node"
    }
  });

  return data;
};

interface Props {
  children: ReactNode;
}

export default async function LocaleLayout({ children }: Props) {
  try {
    const data = await getData();

    return <LanguageProvider data={data}>{children}</LanguageProvider>;
  } catch (e) {
    return <InternalErrorView showPoweredBy />;
  }
}
