import { getRequestConfig } from "next-intl/server";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { middlewareQueryApi } from "./hooks/core/middleware-query-api";

export default getRequestConfig(async ({ locale }) => {
  const data = await middlewareQueryApi();
  const defaultPlugins = [{ code: "core", name: "admin" }];

  const messagesFormApps = await Promise.all(
    (data
      ? [...data.core_plugins__show, ...defaultPlugins]
      : defaultPlugins
    ).map(async (plugin) => {
      return {
        ...(await import(`@/langs/${locale}/${plugin.code}.json`)).default
      };
    })
  );

  return {
    messages: {
      ...messagesFormApps.reduce(
        (acc, messages) => ({ ...acc, ...messages }),
        {}
      )
    },
    timeZone: "UTC"
  };
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation();
