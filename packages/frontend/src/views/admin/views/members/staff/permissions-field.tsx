import { AutoFormItemProps } from '@/components/form/auto-form';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsTrigger } from '@/components/ui/tabs';
import { Admin__Core_Staff_Administrators__ShowQuery } from '@/graphql/queries/admin/members/staff/admin__core_staff_administrators__show.generated';
import { cn } from '@/helpers/classnames';
import React from 'react';
import { FieldValues } from 'react-hook-form';

export interface PermissionsFieldProps {
  permissions: Admin__Core_Staff_Administrators__ShowQuery['admin__core_staff_administrators__show']['permissions'];
}

interface PermissionState {
  permissions: {
    children: string[];
    id: string;
  }[];
  plugin_code: string;
}

export function PermissionsField<T extends FieldValues>({
  field,
  permissions,
}: AutoFormItemProps<T> & PermissionsFieldProps) {
  const [activeTab, setActiveTab] = React.useState(permissions[0].plugin_code);
  const values: PermissionState[] = Array.isArray(field.value)
    ? field.value
    : [];

  return (
    <div>
      <Tabs>
        {permissions.map(permission => (
          <TabsTrigger
            active={activeTab === permission.plugin_code}
            id={permission.plugin_code}
            key={permission.plugin_code}
            onClick={() => {
              setActiveTab(permission.plugin_code);
            }}
          >
            {permission.plugin}
          </TabsTrigger>
        ))}
      </Tabs>

      {permissions.map(plugin => {
        const valuePlugin = values.find(
          value => value.plugin_code === plugin.plugin_code,
        );

        return (
          <div
            className={cn(
              'hidden',
              activeTab === plugin.plugin_code ? 'block' : 'hidden',
            )}
            key={plugin.plugin_code}
          >
            {plugin.permissions.map(permission => {
              const permissionValue = valuePlugin?.permissions.find(
                p => p.id === permission.id,
              );

              return (
                <div className="p-4" key={permission.id}>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={permissionValue?.children.length === 0}
                      id={`${plugin.plugin_code}-${permission.id}`}
                      onCheckedChange={checked => {
                        if (checked) {
                          const valueToChange: PermissionState[] = [
                            ...values.filter(
                              value => value.plugin_code !== plugin.plugin_code,
                            ),
                            {
                              plugin_code: plugin.plugin_code,
                              permissions: valuePlugin
                                ? [
                                    ...valuePlugin.permissions.filter(
                                      p => p.id !== permission.id,
                                    ),
                                    { id: permission.id, children: [] },
                                  ]
                                : [{ id: permission.id, children: [] }],
                            },
                          ];
                          field.onChange(valueToChange);

                          return;
                        }

                        if (!valuePlugin) return;

                        const valueToChange: PermissionState[] = [
                          ...values.filter(
                            value => value.plugin_code !== plugin.plugin_code,
                          ),
                          {
                            ...valuePlugin,
                            permissions: valuePlugin.permissions.filter(
                              p => p.id !== permission.id,
                            ),
                          },
                        ];

                        field.onChange(
                          valueToChange.filter(
                            value => value.permissions.length > 0,
                          ),
                        );
                      }}
                    />
                    <Label
                      className="text-md"
                      htmlFor={`${plugin.plugin_code}-${permission.id}`}
                    >
                      {permission.id}
                    </Label>
                  </div>

                  {permission.children.length > 0 && (
                    <ul className="ml-8 mt-2 space-y-2">
                      {permission.children.map(child => {
                        const childValue = permissionValue?.children.find(
                          c => c === child,
                        );

                        return (
                          <li
                            className="flex items-center gap-2"
                            key={`${plugin.plugin_code}-${permission.id}-${child}`}
                          >
                            <Switch
                              checked={
                                !!childValue ||
                                permissionValue?.children.length === 0
                              }
                              id={`${plugin.plugin_code}-${permission.id}-${child}`}
                              onCheckedChange={checked => {
                                if (checked) {
                                  const valueToChange: PermissionState[] = [
                                    ...values.filter(
                                      value =>
                                        value.plugin_code !==
                                        plugin.plugin_code,
                                    ),
                                    {
                                      plugin_code: plugin.plugin_code,
                                      permissions: valuePlugin
                                        ? [
                                            ...valuePlugin.permissions.filter(
                                              p => p.id !== permission.id,
                                            ),
                                            {
                                              id: permission.id,
                                              children: permissionValue
                                                ? [
                                                    ...permissionValue.children,
                                                    child,
                                                  ]
                                                : [child],
                                            },
                                          ]
                                        : [
                                            {
                                              id: permission.id,
                                              children: [child],
                                            },
                                          ],
                                    },
                                  ];
                                  field.onChange(valueToChange);

                                  return;
                                }

                                if (!valuePlugin) return;

                                const valueToChange: PermissionState[] = [
                                  ...values.filter(
                                    value =>
                                      value.plugin_code !== plugin.plugin_code,
                                  ),
                                  {
                                    ...valuePlugin,
                                    permissions: valuePlugin.permissions.map(
                                      p => {
                                        if (p.id !== permission.id) return p;

                                        return {
                                          ...p,
                                          children: childValue
                                            ? p.children.filter(
                                                c => c !== child,
                                              )
                                            : permission.children.filter(
                                                c => c !== child,
                                              ),
                                        };
                                      },
                                    ),
                                  },
                                ];

                                const checkIfEmpty = valueToChange.find(
                                  value =>
                                    value.plugin_code === plugin.plugin_code &&
                                    value.permissions.find(
                                      p => p.id === permission.id,
                                    )?.children.length === 0,
                                );

                                const returnValue: PermissionState[] =
                                  checkIfEmpty?.plugin_code ===
                                  plugin.plugin_code
                                    ? valueToChange
                                        .map(item => {
                                          if (
                                            item.plugin_code ===
                                            plugin.plugin_code
                                          ) {
                                            return {
                                              ...item,
                                              permissions:
                                                item.permissions.filter(
                                                  p => p.id !== permission.id,
                                                ),
                                            };
                                          }

                                          return item;
                                        })
                                        .filter(
                                          plugin =>
                                            plugin.permissions.length > 0,
                                        )
                                    : valueToChange;

                                field.onChange(returnValue);
                              }}
                            />
                            <Label
                              className="text-md"
                              htmlFor={`${plugin.plugin_code}-${permission.id}-${child}`}
                            >
                              {child}
                            </Label>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
