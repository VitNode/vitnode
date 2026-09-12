/**
 * The one bootstrap adapter this application still owns.
 *
 * Auth, the AdminCP session and the AdminCP user search all reach the API
 * through `@vitnode/core`'s own default transports now, so none of them needs a
 * module here. Messages cannot work that way, for two reasons that only hold
 * in app source:
 *
 * - `loadIntlMessages` reads *this* application's locale barrels, which are the
 *   app's own files plus whichever packages it installed. A package cannot know
 *   them.
 * - `createServerFn` is extracted by the TanStack Start compiler, and the
 *   compiler only runs over the application's source. `@vitnode/core` ships
 *   precompiled, so a server function declared there would never have its
 *   handler extracted and would resolve to `undefined` at runtime.
 *
 * `configureIntl` is where the two meet: the app hands core the fetch and its
 * configured languages, and everything else in the package reads them back
 * through `getIntlRuntime()`.
 */
import { createServerFn } from "@tanstack/react-start";
import { configureIntl, validateIntlInput } from "@vitnode/core/tanstack/i18n";
import { IntlProvider } from "use-intl";

import { loadIntlMessages } from "@/server/messages.server";
import { vitNodeConfig } from "@/vitnode.config";

export const getIntlMessages = createServerFn()
  .validator(validateIntlInput)
  .handler(async ({ data }) => await loadIntlMessages(data));

export const { localeRouting } = configureIntl({
  fetchMessages: async input => await getIntlMessages({ data: input }),

  hostIntlProvider: IntlProvider,
  i18n: vitNodeConfig.i18n,
});
