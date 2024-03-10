import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

import { HeaderContent } from "@/components/header-content/header-content";
import { Badge } from "@/components/ui/badge";
import { RebuildRequiredAdmin } from "@/admin/core/global/rebuild-required";

export const DashboardCoreAdminView = () => {
  const t = useTranslations("core");

  return (
    <>
      <HeaderContent
        h1={
          <>
            <span>VitNode</span>
            {process.env.NODE_ENV === "development" && (
              <Badge
                variant="destructive"
                className="ml-2 bg-yellow-500 text-black hover:bg-yellow-500"
              >
                <AlertTriangle className="size-4" /> Developer Mode
              </Badge>
            )}
          </>
        }
        desc={t("version", { version: "TODO" })}
      />

      <RebuildRequiredAdmin />

      <div>Not implemented!</div>
    </>
  );
};
