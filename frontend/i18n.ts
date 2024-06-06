import { getRequestConfig } from "next-intl/server";

import { middlewareQueryApi } from "./plugins/core/hooks/middleware-query-api";

export default getRequestConfig(async ({ locale }) => {
  const data = await middlewareQueryApi();
  const defaultPlugins = [{ code: "core" }, { code: "admin" }];

  const messagesFormApps = await Promise.all(
    (data
      ? [...data.core_plugins__show, ...defaultPlugins]
      : defaultPlugins
    ).map(async plugin => {
      try {
        return {
          ...(await import(`./plugins/${plugin.code}/langs/${locale}.json`))
            .default
        };
      } catch (e) {
        return {};
      }
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
