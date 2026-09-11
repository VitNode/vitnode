import React from "react";

import type {
  VitNodePublicPlugin,
  VitNodeWebPublicOptions,
} from "@/config/types";
import type { LocaleConfig } from "@/lib/i18n/types";

import { EditorConfigProvider } from "@/components/editor-provider";
import { LanguagesProvider } from "@/components/languages-provider";
import { PublicPluginsProvider } from "@/components/public-plugins-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CONFIG } from "@/lib/config";

import { RateLimitListener } from "./rate-limit-listener";

export interface VitNodeProvidersConfig extends VitNodeWebPublicOptions {
  locales: LocaleConfig[];
  plugins?: readonly VitNodePublicPlugin[];
}

export const VitNodeProviders = ({
  children,
  toaster,
  config: { debug, editor, locales, plugins = [], theme },
}: {
  children: React.ReactNode;
  config: VitNodeProvidersConfig;
  toaster?: React.ComponentProps<typeof Toaster>;
}) => {
  React.useEffect(() => {
    // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler
    if (!(debug && CONFIG.node_development)) return;

    void import("react-scan").then(({ scan }) => scan({ enabled: true }));
  }, [debug]);

  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      enableSystem
      {...theme}
    >
      <Toaster
        closeButton
        position={toaster?.position ?? "top-center"}
        {...toaster}
      />
      <RateLimitListener />
      <TooltipProvider>
        <LanguagesProvider languages={locales}>
          <PublicPluginsProvider plugins={plugins}>
            <EditorConfigProvider config={editor}>
              {children}
            </EditorConfigProvider>
          </PublicPluginsProvider>
        </LanguagesProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};
