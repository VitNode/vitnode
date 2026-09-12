import type { adminModule } from "@/api/modules/admin/admin.module";

import { CONFIG_PLUGIN } from "@/config";
import { clientModule } from "@/lib/fetcher-client";
import { fetcher } from "@/tanstack/fetcher";

import {
  adminSessionFailureFromError,
  adminSessionFailureFromStatus,
} from "./state";

const admin = clientModule<typeof adminModule>(CONFIG_PLUGIN.pluginId);

export const readAdminSessionFromApi = async () => {
  try {
    const response = await fetcher(admin, {
      method: "get",
      module: "admin",
      path: "/session",
    });

    if (response.status === 200) {
      return { session: await response.json(), status: "granted" as const };
    }

    return adminSessionFailureFromStatus(response.status);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[admin] the admin session could not be read", error);

    return adminSessionFailureFromError(error);
  }
};

export const defaultAdminTransport = {
  readAdminSession: readAdminSessionFromApi,
};
