import * as React from "react";
import { useTranslations } from "next-intl";

import { Card } from "@/components/ui/card";
import { DarkLightModeSwitcher } from "@/components/switchers/dark-light-mode-switcher";
import { LogoVitNode } from "@/components/logo-vitnode";
import { PoweredByVitNode } from "../global/powered-by";

interface Props {
  children: React.ReactNode;
}

export const LayoutConfigs = ({ children }: Props) => {
  const t = useTranslations("admin.configs");

  return (
    <div className="container my-10">
      <div className="flex items-center justify-center mb-5">
        <LogoVitNode className="h-16" />
      </div>

      {children}
      <Card className="sm:hidden p-5 text-center">
        {t("mobile_not_supported")}
      </Card>

      <div className="mt-5 flex flex-col justify-center items-center gap-4">
        <PoweredByVitNode />

        <div>
          <DarkLightModeSwitcher />
        </div>
      </div>
    </div>
  );
};
