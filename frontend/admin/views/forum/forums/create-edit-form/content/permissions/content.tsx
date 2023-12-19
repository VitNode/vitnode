import { useCallback, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { keyBy, mapValues } from 'lodash';

import { useTextLang } from '@/hooks/core/use-text-lang';
import { usePermissionsGroupsAdminAPI } from '../hooks/use-permissions-groups-admin';
import { GlobalLoader } from '@/components/loader/global/global-loader';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Loader } from '@/components/loader/loader';

interface Props {
  field: ControllerRenderProps<FieldValues, 'permissions'>;
  permissions: { id: string; title: string; disableForGuest?: boolean }[];
}

export const ContentPermissionsContentCreateEditFormForumAdmin = ({
  field,
  permissions
}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const { data, isError, isFetching, isLoading } = usePermissionsGroupsAdminAPI({
    searchValue
  });
  const { convertText } = useTextLang();

  const Table = useCallback(({ ...props }) => <table className="w-full" {...props} />, []);
  const TableRow = useCallback(
    ({ ...props }) => (
      <tr
        className="[&:not(:last-child)]:border-b transition-colors hover:bg-muted/50"
        {...props}
      />
    ),
    []
  );

  const onToggleAll = (value: string) => {
    field.onChange({
      ...field.value,
      [value]: !field.value[value]
    });
  };

  if (isLoading) return <Loader />;
  // TODO: Add error component
  if (isError) return <div>error</div>;

  return (
    <>
      {isFetching && <GlobalLoader />}

      <Input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder="Search group..."
      />

      <TableVirtuoso
        style={{ height: '50vh' }}
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
                key={permission.id}
                className="px-4 py-3 align-middle font-medium text-muted-foreground"
              >
                <div className="flex gap-4 items-center justify-center">
                  <span>{permission.title}</span>
                  <Switch
                    onClick={() => onToggleAll(`can_all_${permission.id}`)}
                    checked={field.value[`can_all_${permission.id}`]}
                  />
                </div>
              </th>
            ))}
          </tr>
        )}
        itemContent={(index, item) => {
          const findItem = field.value.groups.find((group: { id: string }) => group.id === item.id);
          // Check if:
          // 1. The permission is enabled for all groups
          // 2. The all permissions is enabled for the current group
          const isAllPermissionsEnabled =
            permissions.every(permission => field.value[`can_all_${permission.id}`]) ||
            permissions.every(
              permission => findItem?.[permission.id] || field.value[`can_all_${permission.id}`]
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
                              (group: { id: string }) => group.id !== item.id
                            )
                          ]
                        });

                        return;
                      }

                      const groupPermissions = mapValues(keyBy(permissions, 'id'), () => true);

                      field.onChange({
                        ...field.value,
                        groups: [
                          ...field.value.groups.filter(
                            (group: { id: string }) => group.id !== item.id
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
                    (findItem && findItem[permission.id])) &&
                  item.guest !== permission.disableForGuest
                );

                return (
                  <td key={permission.id} className="px-4 py-2 text-center">
                    <Switch
                      onClick={() => {
                        if (field.value[`can_all_${permission.id}`]) {
                          const groupPermissions = mapValues(keyBy(permissions, 'id'), () => false);

                          field.onChange({
                            ...field.value,
                            [`can_all_${permission.id}`]: false,
                            groups: data.map(group => {
                              if (group.id === item.id) {
                                return {
                                  id: group.id,
                                  ...groupPermissions,
                                  [permission.id]: false
                                };
                              }

                              return { id: group.id, ...groupPermissions, [permission.id]: true };
                            })
                          });

                          return;
                        }

                        if (!findItem) {
                          const groupPermissions = mapValues(keyBy(permissions, 'id'), item => {
                            if (item.id === permission.id) {
                              return true;
                            }

                            return false;
                          });

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
                              (group: { id: string }) => group.id !== item.id
                            ),
                            {
                              ...findItem,
                              [permission.id]: !findItem[permission.id]
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
