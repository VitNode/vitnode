import React from 'react';
import { useTranslations } from 'next-intl';

import {
  useCreateEditFormGroupsMembersAdmin,
  CreateEditFormGroupsMembersAdminArgs,
} from './hooks/use-create-edit-form-groups-members-admin';
import { useTextLang } from '@/hooks/use-text-lang';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AutoForm } from '@/components/form/auto-form';
import { AutoFormInput } from '@/components/form/fields/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  AutoFormInputComponentProps,
  DependencyType,
  FieldRenderParentProps,
} from '@/components/form/type';
import { AutoFormColor } from '@/components/form/fields/color';
import { AutoFormSwitch } from '@/components/form/fields/switch';
import { AutoFormTextLanguageInput } from '@/components/form/fields/text-language-input';

enum TabsEnum {
  MAIN = 'main',
  CONTENT = 'content',
}

export const CreateEditFormGroupsMembersAdmin = ({
  data,
}: CreateEditFormGroupsMembersAdminArgs) => {
  const t = useTranslations('admin.members.groups');
  const tCore = useTranslations('core');
  const [activeTab, setActiveTab] = React.useState<TabsEnum>(TabsEnum.MAIN);
  const { onSubmit, formSchema } = useCreateEditFormGroupsMembersAdmin({
    data,
  });
  const { convertText } = useTextLang();

  return (
    <>
      <DialogHeader>
        <DialogTitle>{data ? t('edit.title') : t('create.title')}</DialogTitle>
        {data && (
          <DialogDescription>{convertText(data.name)}</DialogDescription>
        )}

        <Tabs>
          <TabsTrigger
            id="main"
            active={activeTab === TabsEnum.MAIN}
            onClick={() => {
              setActiveTab(TabsEnum.MAIN);
            }}
          >
            {t('create_edit.main')}
          </TabsTrigger>
          <TabsTrigger
            id="content"
            active={activeTab === TabsEnum.CONTENT}
            onClick={() => {
              setActiveTab(TabsEnum.CONTENT);
            }}
          >
            {t('create_edit.content')}
          </TabsTrigger>
        </Tabs>
      </DialogHeader>

      <AutoForm
        onSubmit={onSubmit}
        formSchema={formSchema}
        submitButton={props => (
          <DialogFooter>
            <Button {...props}>{tCore('save')}</Button>
          </DialogFooter>
        )}
        fieldConfig={{
          main: {
            name: {
              label: t('create_edit.name'),
              fieldType: AutoFormTextLanguageInput,
            },
            color: {
              label: t('create_edit.color'),
              fieldType: AutoFormColor,
            },
          },
          content: {
            files_allow_upload: {
              label: t('create_edit.files.allow_upload'),
              fieldType: AutoFormSwitch,
            },
            files_total_max_storage: {
              label: t('create_edit.files.total_max_storage'),
              fieldType: (props: AutoFormInputComponentProps) => {
                const value = props.autoFormProps.field.value;

                return (
                  <AutoFormInput
                    className="max-w-32"
                    type="number"
                    disabled={value === -1}
                    value={value === -1 ? '' : value}
                    {...props}
                  />
                );
              },
              renderParent: ({ children, field }: FieldRenderParentProps) => (
                <div className="flex flex-wrap items-center gap-2">
                  {children}
                  <span>{t('create_edit.in_kb')}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <span>{tCore('or')}</span>
                    <Checkbox
                      id="content.files_total_max_storage.unlimited"
                      onClick={() => {
                        if (field.value === -1) {
                          field.onChange(10000);

                          return;
                        }

                        field.onChange(-1);
                      }}
                      checked={field.value === -1}
                    />
                    <Label htmlFor="content.files_total_max_storage.unlimited">
                      {tCore('unlimited')}
                    </Label>
                  </div>
                </div>
              ),
            },
            files_max_storage_for_submit: {
              label: t('create_edit.files.max_storage_for_submit.label'),
              renderParent: ({ children, field }: FieldRenderParentProps) => (
                <div className="flex flex-wrap items-center gap-2">
                  {children}
                  <span>{t('create_edit.in_kb')}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <span>{tCore('or')}</span>
                    <Checkbox
                      id="content.files_max_storage_for_submit.unlimited"
                      onClick={() => {
                        if (field.value === -1) {
                          field.onChange(10000);

                          return;
                        }

                        field.onChange(-1);
                      }}
                      checked={field.value === -1}
                    />
                    <Label htmlFor="content.files_max_storage_for_submit.unlimited">
                      {tCore('unlimited')}
                    </Label>
                  </div>
                </div>
              ),
              fieldType: (props: AutoFormInputComponentProps) => {
                const value = props.autoFormProps.field.value;

                return (
                  <AutoFormInput
                    className="max-w-32"
                    type="number"
                    disabled={value === -1}
                    value={value === -1 ? '' : value}
                    {...props}
                  />
                );
              },
            },
          },
        }}
        dependencies={[
          {
            sourceField: 'main',
            type: DependencyType.HIDES,
            targetField: 'main',
            when: () => activeTab !== TabsEnum.MAIN,
          },
          {
            sourceField: 'content',
            type: DependencyType.HIDES,
            targetField: 'content',
            when: () => activeTab !== TabsEnum.CONTENT,
          },
        ]}
      />
    </>
  );
};
