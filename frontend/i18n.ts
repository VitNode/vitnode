import { getRequestConfig } from "next-intl/server";

import {
  Core_Middleware__Show,
  Core_Middleware__ShowQuery,
  Core_Middleware__ShowQueryVariables
} from "./graphql/hooks";
import { fetcher } from "./graphql/fetcher";

export default getRequestConfig(async ({ locale }) => {
  const {
    data: {
      core_middleware__show: { plugins }
    }
  } = await fetcher<
    Core_Middleware__ShowQuery,
    Core_Middleware__ShowQueryVariables
  >({
    query: Core_Middleware__Show
  });

  const messagesFormApps = await Promise.all(
    plugins.map(async plugin => {
      try {
        return {
          ...(await import(`./plugins/${plugin}/langs/${locale}.json`)).default
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
