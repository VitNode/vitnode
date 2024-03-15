import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

import { HeaderContent } from "@/components/header-content/header-content";
import { Badge } from "@/components/ui/badge";
import { RebuildRequiredAdmin } from "@/admin/core/global/rebuild-required";
import { CONFIG } from "@/config";
import { SignUpStatsDashboardCoreAdmin } from "./sign-up-stats";
import type { Admin__Core__DashboardQuery } from "@/graphql/hooks";

interface Props {
  data: Admin__Core__DashboardQuery;
}

export const DashboardCoreAdminView = ({ data }: Props) => {
  const t = useTranslations("core");

  return (
    <>
      <HeaderContent
        h1={
          <>
            <span>VitNode</span>
            {CONFIG.node_development && (
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

      <div className="relative h-[20rem] max-w-full">
        <SignUpStatsDashboardCoreAdmin
          data={data.admin__core_members__stats_sign_up}
        />
      </div>
    </>
  );
};
