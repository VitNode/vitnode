import { getRequestConfig } from "next-intl/server";
import { fetcher } from "vitnode-frontend/helpers/fetcher";

import {
  Core_Middleware__Show,
  Core_Middleware__ShowQuery,
  Core_Middleware__ShowQueryVariables,
} from "./graphql/hooks";

export default getRequestConfig(async ({ locale }) => {
  let plugins: string[] = [];
  try {
    const {
      data: {
        core_middleware__show: { plugins: pluginsFromServer },
      },
    } = await fetcher<
      Core_Middleware__ShowQuery,
      Core_Middleware__ShowQueryVariables
    >({
      query: Core_Middleware__Show,
    });

    plugins = pluginsFromServer;
  } catch (e) {
    plugins = ["core", "admin"];
  }

  const messagesFormApps = await Promise.all(
    plugins.map(async plugin => {
      try {
        return {
          ...(await import(`./plugins/${plugin}/langs/${locale}.json`)).default,
        };
      } catch (e) {
        return {};
      }
    }),
  );

  return {
    messages: {
      ...messagesFormApps.reduce(
        (acc, messages) => ({ ...acc, ...messages }),
        {},
      ),
    },
    timeZone: "UTC",
  };
});
