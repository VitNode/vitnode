import * as React from "react";
import { useTranslations } from "next-intl";
import { Card, LogoVitNode } from "vitnode-frontend/components";

import { DarkLightModeSwitcher } from "@/components/switchers/dark-light-mode-switcher";
import { PoweredByVitNode } from "vitnode-frontend/views/global";

interface Props {
  children: React.ReactNode;
}

export const LayoutConfigs = ({ children }: Props) => {
  const t = useTranslations("admin.configs");

  return (
    <div className="container my-10">
      <div className="mb-5 flex items-center justify-center">
        <LogoVitNode className="h-16" />
      </div>

      {children}
      <Card className="p-5 text-center sm:hidden">
        {t("mobile_not_supported")}
      </Card>

      <div className="mt-5 flex flex-col items-center justify-center gap-4">
        <PoweredByVitNode />

        <div>
          <DarkLightModeSwitcher />
        </div>
      </div>
    </div>
  );
};
