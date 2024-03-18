import { useTranslations } from "next-intl";

import { cn } from "@/functions/classnames";
import type { Admin__Core_Plugins__FilesQuery } from "@/graphql/hooks";

export const FilesDevPluginAdminView = ({
  admin__core_plugins__files
}: Admin__Core_Plugins__FilesQuery) => {
  const t = useTranslations("admin.core.plugins.download.check");

  return (
    <ul>
      {Object.entries(admin__core_plugins__files).map(item => (
        <li key={item[0]}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          {t.rich(item[0], {
            status: () => (
              <span
                className={cn("text-sm", {
                  "text-muted-foreground italic": !item[1],
                  "text-primary font-semibold": item[1],
                  "text-destructive font-semibold":
                    !item[1] && item[0] === "default_page"
                })}
              >
                {t("file_detected", { count: +item[1] })}
              </span>
            )
          })}
        </li>
      ))}
    </ul>
  );
};
