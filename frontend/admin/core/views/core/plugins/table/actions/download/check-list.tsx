import { useTranslations } from "next-intl";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/functions/classnames";
import type { Admin__Core_Plugins__Download_CheckQuery } from "@/graphql/hooks";

interface Props {
  data: Admin__Core_Plugins__Download_CheckQuery | undefined;
  isError: boolean;
  isLoading: boolean;
}

export const CheckListDownloadPluginActionsAdmin = ({
  data,
  isError,
  isLoading
}: Props) => {
  const t = useTranslations("admin.core.plugins.download.check");
  const tCore = useTranslations("core.errors");

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (!data || isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>{tCore("title")}</AlertTitle>
        <AlertDescription>{tCore("internal_server_error")}</AlertDescription>
      </Alert>
    );
  }

  return (
    <ul>
      {Object.entries(data.admin__core_plugins__download_check).map(item => (
        <li key={item[0]}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          {t.rich(item[0], {
            status: () => (
              <span
                className={cn("text-sm", {
                  "text-muted-foreground italic": !item[1],
                  "text-primary font-semibold": item[1]
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
