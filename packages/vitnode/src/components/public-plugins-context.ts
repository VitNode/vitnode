import React from "react";

import type { JsonValue, VitNodePublicPlugin } from "@/config/types";

import { pluginPublicOptions } from "@/config/public";

export const PublicPluginsContext = React.createContext<
  readonly VitNodePublicPlugin[]
>([]);

export const usePublicPlugins = (): readonly VitNodePublicPlugin[] =>
  React.use(PublicPluginsContext);

export const usePluginPublicOptions = <T extends JsonValue = JsonValue>(
  pluginId: string,
): T | undefined =>
  pluginPublicOptions<T>({ plugins: [...usePublicPlugins()] }, pluginId);
