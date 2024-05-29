import { Monitor, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { DateFormat } from "@/components/date-format/date-format";
import { Separator } from "@/components/ui/separator";
import { DevicesSettingsViewProps } from "./devices-settings-view";
import { Badge } from "@/components/ui/badge";

const getDeviceIcon = (device: string) => {
  if (
    device.includes("Android") ||
    device.includes("Windows Phone") ||
    device.includes("iPhone") ||
    device.includes("iPad")
  ) {
    return <Phone />;
  }

  return <Monitor />;
};

export const ContentDevicesSettings = ({
  core_sessions__devices__show: devices,
  loginToken
}: DevicesSettingsViewProps) => {
  const t = useTranslations("core.settings.devices");

  return (
    <div className="space-y-6">
      {devices.map(device => (
        <div key={device.id} className="border p-6 rounded-md space-y-4">
          <div className="flex gap-4 flex-wrap items-center">
            <div className="bg-primary/10 flex items-center justify-center flex-shrink-0 [&>svg]:text-primary [&>svg]:size-8 p-2 rounded-sm">
              {getDeviceIcon(device.uagent_os)}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 flex-wrap items-center">
                <h3 className="text-lg font-medium leading-none">
                  {device.uagent_os}
                </h3>
                {loginToken === device.login_token ? (
                  <Badge>{t("current_device")}</Badge>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground">
                {t.rich("last_active", {
                  time: () => <DateFormat date={device.last_seen} />
                })}
              </p>
            </div>
          </div>

          <Separator />

          <ul className="[&>li]:flex [&>li]:flex-col sm:[&>li]:flex-row [&>li]:gap-1 sm:[&>li]:gap-4 sm:[&>li>div:first-child]:w-52 sm:[&>li>div:first-child]:flex-shrink-0 [&>li>div:first-child]:text-muted-foreground space-y-2">
            <li>
              <div>{t("browser")}</div>
              <div>
                {device.uagent_browser} {device.uagent_version}
              </div>
            </li>

            <li>
              <div>{t("ip_address")}</div>
              <div>{device.ip_address}</div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};
