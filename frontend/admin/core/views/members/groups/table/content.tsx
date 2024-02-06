import { useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { Link } from "@/i18n";
import type { ShowAdminGroups } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { ActionsTableGroupsMembersAdmin } from "./actions/actions-table-groups-members-admin";
import { DateFormat } from "@/components/date-format/date-format";
import { HeaderSortingDataTable } from "@/components/data-table/header";
import type { GroupsMembersAdminViewProps } from "../groups-members-admin-view";
import { Badge } from "@/components/ui/badge";

export const ContentTableGroupsMembersAdmin = ({
  data
}: GroupsMembersAdminViewProps) => {
  const t = useTranslations("admin.members.groups");
  const tCore = useTranslations("core");
  const { convertText } = useTextLang();

  const columns: ColumnDef<ShowAdminGroups>[] = useMemo(
    () => [
      {
        header: tCore("table.name"),
        accessorKey: "name",
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div className="flex items-center gap-4">
              <span>{convertText(data.name)}</span>
              {data.default && <Badge>{t("default")}</Badge>}
              {data.root && <Badge>{t("root")}</Badge>}
            </div>
          );
        }
      },
      {
        header: t("table.users_count"),
        accessorKey: "users_count",
        cell: ({ row }) => {
          const data = row.original;

          return !data.guest ? (
            <Link href={`/admin/members/users?groups=${data.id}`}>
              {data.users_count}
            </Link>
          ) : null;
        }
      },
      {
        header: val => {
          return (
            <HeaderSortingDataTable {...val}>
              {tCore("table.updated")}
            </HeaderSortingDataTable>
          );
        },
        accessorKey: "updated",
        cell: ({ row }) => {
          const data = row.original;

          return <DateFormat date={data.updated} />;
        }
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const data = row.original;

          return <ActionsTableGroupsMembersAdmin data={data} />;
        }
      }
    ],
    []
  );

  return (
    <DataTable
      data={data?.core_groups__admin__show.edges ?? []}
      pageInfo={data?.core_groups__admin__show.pageInfo}
      defaultPageSize={10}
      columns={columns}
      searchPlaceholder={t("search_placeholder")}
      defaultSorting={{
        sortBy: "updated",
        sortDirection: "desc"
      }}
    />
  );
};
