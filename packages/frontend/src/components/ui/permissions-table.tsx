import { ShowAdminGroups } from '@/graphql/types';
import { keyBy, mapValues } from 'lodash';
import React from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { TableVirtuoso } from 'react-virtuoso';

import { useTextLang } from '../../hooks/use-text-lang';
import { usePermissionsGroupsAdminAPI } from '../utils/permissions-table/use-permissions-table-api';
import { Input } from './input';
import { Loader } from './loader';
import { Switch } from './switch';

export const PermissionsTable = ({
  field,
  permissions,
}: {
  field: ControllerRenderProps<FieldValues, 'permissions'>;
  permissions: { disableForGuest?: boolean; id: string; title: string }[];
}) => {
  const [searchValue, setSearchValue] = React.useState('');
  const { convertText } = useTextLang();
  const { data, isError, isLoading } = usePermissionsGroupsAdminAPI({
    searchValue,
  });

  const fieldValue: { groups: { id: number }[] } = field.value;

  const Table = React.useCallback(
    ({ ...props }) => <table className="w-full" {...props} />,
    [],
  );
  const TableRow = React.useCallback(
    ({ ...props }) => (
      <tr
        className="hover:bg-muted/50 transition-colors [&:not(:last-child)]:border-b"
        {...props}
      />
    ),
    [],
  );

  const onToggleAll = (id: string) => {
    const stateToUpdate = !field.value[`can_all_${id}`];

    field.onChange({
      ...field.value,
      [`can_all_${id}`]: stateToUpdate,
      groups: fieldValue.groups.map(group => {
        return {
          ...group,
          [id]: stateToUpdate,
        };
      }),
    });
  };

  if (isLoading) return <Loader />;
  // TODO: Add error component
  if (isError) return <div>error</div>;

  return (
    <>
      <Input
        onChange={e => {
          setSearchValue(e.target.value);
        }}
        placeholder="Search group..."
        value={searchValue}
      />

      <TableVirtuoso
        className="rounded-md border"
        components={{
          Table,
          TableRow,
        }}
        data={data}
        fixedHeaderContent={() => (
          <tr className="bg-card border-b">
            <th />
            {permissions.map(permission => (
              <th
                className="text-muted-foreground px-4 py-3 align-middle font-medium"
                key={`header_can_${permission.id}`}
              >
                <div className="flex items-center justify-center gap-4">
                  <span>{permission.title}</span>
                  <Switch
                    checked={field.value[`can_all_${permission.id}`]}
                    onClick={() => {
                      onToggleAll(permission.id);
                    }}
                  />
                </div>
              </th>
            ))}
          </tr>
        )}
        itemContent={(index, item) => {
          const findItem = fieldValue.groups.find(
            group => group.id === item.id,
          );
          // Check if:
          // 1. The permission is enabled for all groups
          // 2. The all permissions is enabled for the current group
          const isAllPermissionsEnabled =
            permissions.every(
              permission => field.value[`can_all_${permission.id}`],
            ) || permissions.every(permission => findItem?.[permission.id]);

          return (
            <>
              <td className="px-4 py-2">
                <div className="flex flex-col gap-2">
                  <span>{convertText(item.name)}</span>
                  <Switch
                    checked={isAllPermissionsEnabled}
                    onClick={() => {
                      if (isAllPermissionsEnabled) {
                        const disableAllPermissions = mapValues(
                          keyBy(
                            permissions.map(item => ({
                              ...item,
                              id: `can_all_${item.id}`,
                            })),
                            'id',
                          ),
                          () => false,
                        );

                        const groups = data
                          .filter(group => group.id !== item.id)
                          .map(group => {
                            return {
                              id: group.id,
                              ...mapValues(keyBy(permissions, 'id'), el => {
                                // Find if the permission is enabled for all groups
                                if (field.value[`can_all_${el.id}`]) {
                                  return true;
                                }

                                const findGroupInField = fieldValue.groups.find(
                                  ({ id }) => id === group.id,
                                );

                                if (findGroupInField) {
                                  return findGroupInField[el.id];
                                }

                                return false;
                              }),
                            };
                          });

                        field.onChange({
                          ...disableAllPermissions,
                          groups,
                        });

                        return;
                      }

                      const groupPermissions = mapValues(
                        keyBy(permissions, 'id'),
                        () => true,
                      );

                      field.onChange({
                        ...field.value,
                        groups: [
                          ...fieldValue.groups.filter(
                            group => group.id !== item.id,
                          ),
                          {
                            id: item.id,
                            ...groupPermissions,
                          },
                        ],
                      });
                    }}
                  />
                </div>
              </td>

              {permissions.map(permission => {
                // Check if:
                // 1. The permission is enabled for all groups
                // 2. The permission is enabled for the current group
                const checked = !!(
                  (field.value[`can_all_${permission.id}`] ||
                    findItem?.[permission.id]) &&
                  item.guest !== permission.disableForGuest
                );

                return (
                  <td className="px-4 py-2 text-center" key={permission.id}>
                    <Switch
                      checked={checked}
                      disabled={item.guest === permission.disableForGuest}
                      onClick={() => {
                        if (field.value[`can_all_${permission.id}`]) {
                          const groupPermissions = mapValues(
                            keyBy(
                              permissions.map(item => ({
                                id: item.id,
                              })),
                              'id',
                            ),
                            () => false,
                          );

                          const groups = data.map(
                            (group: Pick<ShowAdminGroups, 'id'>) => {
                              const findExistingGroup = fieldValue.groups.find(
                                ({ id }) => id === group.id,
                              );

                              if (group.id === item.id) {
                                return {
                                  id: group.id,
                                  ...groupPermissions,
                                  ...findExistingGroup,
                                  [permission.id]: false,
                                };
                              }

                              return {
                                id: group.id,
                                ...groupPermissions,
                                ...findExistingGroup,
                                [permission.id]: true,
                              };
                            },
                          );

                          field.onChange({
                            ...field.value,
                            [`can_all_${permission.id}`]: false,
                            groups,
                          });

                          return;
                        }

                        // Check only this field if the group is not in the list
                        if (!findItem) {
                          const groupPermissions = mapValues(
                            keyBy(
                              permissions.map(item => ({
                                id: item.id,
                              })),
                              'id',
                            ),
                            item => {
                              if (item.id === permission.id) {
                                return true;
                              }

                              return false;
                            },
                          );

                          field.onChange({
                            ...field.value,
                            groups: [
                              ...field.value.groups,
                              {
                                id: item.id,
                                ...groupPermissions,
                              },
                            ],
                          });

                          return;
                        }

                        const otherGroups = fieldValue.groups.filter(
                          group => group.id !== item.id,
                        );

                        field.onChange({
                          ...field.value,
                          groups: [
                            ...otherGroups,
                            {
                              ...findItem,
                              [permission.id]: !findItem[permission.id],
                            },
                          ],
                        });
                      }}
                    />
                  </td>
                );
              })}
            </>
          );
        }}
        overscan={200}
        style={{ height: '50vh' }}
      />
    </>
  );
};
