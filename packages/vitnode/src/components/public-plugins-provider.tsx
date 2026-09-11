import type { VitNodePublicPlugin } from "@/config/types";

import { PublicPluginsContext } from "./public-plugins-context";

export const PublicPluginsProvider = ({
  children,
  plugins,
}: {
  children: React.ReactNode;
  plugins: readonly VitNodePublicPlugin[];
}) => (
  <PublicPluginsContext.Provider value={plugins}>
    {children}
  </PublicPluginsContext.Provider>
);
