import { useTranslations } from "next-intl";

import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Core_Sessions__Devices__ShowQuery } from "@/graphql/hooks";
import { ContentDevicesSettings } from "./content";

export interface DevicesSettingsViewProps
  extends Core_Sessions__Devices__ShowQuery {
  loginToken: string;
}

export default function DevicesSettingsView(props: DevicesSettingsViewProps) {
  const t = useTranslations("core.settings.devices");

  return (
    <>
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {t("title")}
        </h1>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>

      <CardContent>
        <ContentDevicesSettings {...props} />
      </CardContent>
    </>
  );
}
