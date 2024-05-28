import * as React from "react";
import { useTranslations } from "next-intl";

import { NavSettings } from "./nav/nav-settings";
import { HeaderContent } from "@/components/header-content/header-content";
import { Card } from "@/components/ui/card";

interface Props {
  children: React.ReactNode;
}

export default function LayoutSettingsView({ children }: Props) {
  const t = useTranslations("core");

  return (
    <>
      <HeaderContent
        className="mb-5"
        h2={t("settings.title")}
        desc={t("settings.desc")}
      />

      <div className="lg:gap-8 flex flex-col lg:flex-row gap-4 items-start">
        <NavSettings />
        <Card className="flex-grow">{children}</Card>
      </div>
    </>
  );
}
