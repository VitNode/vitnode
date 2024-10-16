import { AutoFormItemProps } from '@/components/form/auto-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsTrigger } from '@/components/ui/tabs';
import { Admin__Core_Staff_Administrators__ShowQuery } from '@/graphql/queries/admin/members/staff/admin__core_staff_administrators__show.generated';
import { cn } from '@/helpers/classnames';
import { AccordionTrigger } from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations();

  return (
    <Accordion type="multiple">
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
              activeTab === plugin.plugin_code ? 'block' : 'hidden',
            )}
            key={plugin.plugin_code}
          >
            {plugin.permissions.map(permission => {
              const permissionValue = valuePlugin?.permissions.find(
                p => p.id === permission.id,
              );
              const langKey = `admin_${plugin.plugin_code}.admin_permissions.${permission.id}`;

              return (
                <AccordionItem
                  className="py-2 sm:p-4"
                  key={permission.id}
                  value={permission.id}
                >
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

                    <AccordionTrigger asChild>
                      <div className="text-md flex cursor-pointer items-center gap-2 truncate transition-all [&[data-state=open]>svg]:rotate-180">
                        <span className="truncate">
                          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                          {/* @ts-expect-error */}
                          {t.has(langKey) ? t(langKey) : langKey}
                        </span>
                        <ChevronDown className="size-5 shrink-0 transition-transform duration-200" />
                      </div>
                    </AccordionTrigger>
                  </div>

                  <AccordionContent>
                    {permission.children.length > 0 && (
                      <ul className="ml-4 mt-2 space-y-2 sm:ml-8">
                        {permission.children.map(child => {
                          const childValue = permissionValue?.children.find(
                            c => c === child,
                          );
                          const childLangKey = `${langKey}_${child}`;

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
                                        value.plugin_code !==
                                        plugin.plugin_code,
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
                                      value.plugin_code ===
                                        plugin.plugin_code &&
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
                                className="text-muted-foreground truncate"
                                htmlFor={`${plugin.plugin_code}-${permission.id}-${child}`}
                              >
                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                {/* @ts-expect-error */}
                                {t.has(childLangKey)
                                  ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    t(childLangKey)
                                  : childLangKey}
                              </Label>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </div>
        );
      })}
    </Accordion>
  );
}
