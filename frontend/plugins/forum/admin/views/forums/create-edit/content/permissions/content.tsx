import * as React from "react";
import { TableVirtuoso } from "react-virtuoso";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { keyBy, mapValues } from "lodash";

import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { usePermissionsGroupsAdminAPI } from "../hooks/use-permissions-groups-admin";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader } from "@/components/loader";
import { ShowAdminGroups } from "@/utils/graphql/hooks";

interface Props {
  field: ControllerRenderProps<FieldValues, "permissions">;
  permissions: { id: string; title: string; disableForGuest?: boolean }[];
}

export const ContentPermissionsContentCreateEditFormForumAdmin = ({
  field,
  permissions
}: Props) => {
  const [searchValue, setSearchValue] = React.useState("");
  const { data, isError, isLoading } = usePermissionsGroupsAdminAPI({
    searchValue
  });
  const { convertText } = useTextLang();

  const Table = React.useCallback(
    ({ ...props }) => <table className="w-full" {...props} />,
    []
  );
  const TableRow = React.useCallback(
    ({ ...props }) => (
      <tr
        className="[&:not(:last-child)]:border-b transition-colors hover:bg-muted/50"
        {...props}
      />
    ),
    []
  );

  const onToggleAll = (id: string) => {
    const stateToUpdate = !field.value[`can_all_${id}`];

    field.onChange({
      ...field.value,
      [`can_all_${id}`]: stateToUpdate,
      groups: field.value.groups.map((group: { group_id: number }) => {
        return {
          ...group,
          [`can_${id}`]: stateToUpdate
        };
      })
    });
  };

  if (isLoading) return <Loader />;
  // TODO: Add error component
  if (isError) return <div>error</div>;

  return (
    <>
      <Input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder="Search group..."
      />

      <TableVirtuoso
        style={{ height: "50vh" }}
        data={data}
        overscan={200}
        className="border rounded-md"
        components={{
          Table,
          TableRow
        }}
        fixedHeaderContent={() => (
          <tr className="bg-card border-b">
            <th />
            {permissions.map(permission => (
              <th
                key={`header_can_${permission.id}`}
                className="px-4 py-3 align-middle font-medium text-muted-foreground"
              >
                <div className="flex gap-4 items-center justify-center">
                  <span>{permission.title}</span>
                  <Switch
                    onClick={() => onToggleAll(permission.id)}
                    checked={field.value[`can_all_${permission.id}`]}
                  />
                </div>
              </th>
            ))}
          </tr>
        )}
        itemContent={(index, item) => {
          const findItem = field.value.groups.find(
            (group: { group_id: number }) => group.group_id === item.id
          );
          // Check if:
          // 1. The permission is enabled for all groups
          // 2. The all permissions is enabled for the current group
          const isAllPermissionsEnabled =
            permissions.every(
              permission => field.value[`can_all_${permission.id}`]
            ) ||
            permissions.every(
              permission =>
                findItem?.[`can_${permission.id}`] ||
                field.value[`can_all_${permission.id}`]
            );

          return (
            <>
              <td className="px-4 py-2">
                <div className="flex gap-2 flex-col">
                  <span>{convertText(item.name)}</span>
                  <Switch
                    onClick={() => {
                      if (isAllPermissionsEnabled) {
                        field.onChange({
                          ...field.value,
                          groups: [
                            ...field.value.groups.filter(
                              (group: { id: number }) => group.id !== item.id
                            )
                          ]
                        });

                        return;
                      }

                      const groupPermissions = mapValues(
                        keyBy(permissions, "id"),
                        () => true
                      );

                      field.onChange({
                        ...field.value,
                        groups: [
                          ...field.value.groups.filter(
                            (group: { group_id: number }) =>
                              group.group_id !== item.id
                          ),
                          {
                            id: item.id,
                            ...groupPermissions
                          }
                        ]
                      });
                    }}
                    checked={isAllPermissionsEnabled}
                  />
                </div>
              </td>

              {permissions.map(permission => {
                // Check if:
                // 1. The permission is enabled for all groups
                // 2. The permission is enabled for the current group
                const checked: boolean = !!(
                  (field.value[`can_all_${permission.id}`] ||
                    findItem?.[`can_${permission.id}`]) &&
                  item.guest !== permission.disableForGuest
                );

                return (
                  <td
                    key={`can_${permission.id}`}
                    className="px-4 py-2 text-center"
                  >
                    <Switch
                      onClick={() => {
                        if (field.value[`can_all_${permission.id}`]) {
                          const groupPermissions = mapValues(
                            keyBy(
                              permissions.map(item => ({
                                id: `can_${item.id}`
                              })),
                              "id"
                            ),
                            () => false
                          );

                          const groups = data.map(
                            (group: Pick<ShowAdminGroups, "id">) => {
                              const findExistingGroup = field.value.groups.find(
                                ({ group_id }: { group_id: number }) =>
                                  group_id === group.id
                              );

                              if (group.id === item.id) {
                                return {
                                  group_id: group.id,
                                  ...groupPermissions,
                                  ...findExistingGroup,
                                  [`can_${permission.id}`]: false
                                };
                              }

                              return {
                                group_id: group.id,
                                ...groupPermissions,
                                ...findExistingGroup,
                                [`can_${permission.id}`]: true
                              };
                            }
                          );

                          field.onChange({
                            ...field.value,
                            [`can_all_${permission.id}`]: false,
                            groups
                          });

                          return;
                        }

                        if (!findItem) {
                          const groupPermissions = mapValues(
                            keyBy(
                              permissions.map(item => ({
                                id: `can_${item.id}`
                              })),
                              "id"
                            ),
                            item => {
                              if (item.id === permission.id) {
                                return true;
                              }

                              return false;
                            }
                          );

                          field.onChange({
                            ...field.value,
                            groups: [
                              ...field.value.groups,
                              {
                                id: item.id,
                                ...groupPermissions
                              }
                            ]
                          });

                          return;
                        }

                        field.onChange({
                          ...field.value,
                          groups: [
                            ...field.value.groups.filter(
                              (group: { group_id: number }) =>
                                group.group_id !== item.id
                            ),
                            {
                              ...findItem,
                              [`can_${permission.id}`]:
                                !findItem[`can_${permission.id}`]
                            }
                          ]
                        });
                      }}
                      checked={checked}
                      disabled={item.guest === permission.disableForGuest}
                    />
                  </td>
                );
              })}
            </>
          );
        }}
      />
    </>
  );
};
