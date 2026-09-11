import "@tanstack/react-start/server-only";
import { createIntlMessagesLoader } from "@vitnode/core/tanstack/i18n/server";

import vitNodeConfig from "@/vitnode.config";

export type { IntlMessages } from "@vitnode/core/tanstack/i18n/server";

export const loadIntlMessages = createIntlMessagesLoader(vitNodeConfig);
