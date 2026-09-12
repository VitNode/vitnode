import type { adminModule } from "@/api/modules/admin/admin.module";

import { CONFIG_PLUGIN } from "@/config";
import { clientModule } from "@/lib/fetcher-client";
import { fetcher } from "@/tanstack/fetcher";

import { readAdminSessionThrough } from "./session-read";

const admin = clientModule<typeof adminModule>(CONFIG_PLUGIN.pluginId);

export const readAdminSessionFromApi = async () =>
  await readAdminSessionThrough(async () => {
    const response = await fetcher(admin, {
      method: "get",
      module: "admin",
      path: "/session",
    });

    // The narrowing stays here rather than in the shared read: the route's
    // `403` is declared without a body, so only the `200` arm of the response
    // union has a payload type to infer `AdminSessionApi` from.
    return {
      session: response.status === 200 ? await response.json() : undefined,
      status: response.status,
    };
  });

export const defaultAdminTransport = {
  readAdminSession: readAdminSessionFromApi,
};
