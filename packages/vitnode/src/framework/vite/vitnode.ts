import type { Plugin } from "vite";

import type { VitNodeClientGuardOptions } from "./client-guard";
import type { VitNodeEnvOptions } from "./env";
import type { VitNodePluginRoutesOptions } from "./plugin-routes";

import { vitNodeClientGuard } from "./client-guard";
import { vitNodeEnv } from "./env";
import { vitNodeOptimizeDeps } from "./optimize-deps";
import { vitNodePluginRoutes } from "./plugin-routes";
import { vitNodeSsrExternals } from "./ssr-externals";

export interface VitNodeViteOptions
  extends VitNodeEnvOptions, VitNodePluginRoutesOptions {
  clientGuard?: Pick<
    VitNodeClientGuardOptions,
    "forbiddenModules" | "ignoreEnvKeys"
  >;
}

export const vitnode = ({
  appRoot,
  clientEnv,
  clientGuard,
  hostRoutesDir,
}: VitNodeViteOptions): Plugin[] => [
  vitNodeEnv({ clientEnv }),
  vitNodeOptimizeDeps(),
  vitNodeSsrExternals({ appRoot }),
  vitNodePluginRoutes({ appRoot, hostRoutesDir }),
  vitNodeClientGuard({ appRoot, ...clientGuard }),
];
