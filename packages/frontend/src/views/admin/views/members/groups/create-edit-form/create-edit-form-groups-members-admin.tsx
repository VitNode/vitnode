import { AutoForm, DependencyType } from '@/components/form/auto-form';
import { AutoFormColorPicker } from '@/components/form/fields/color-picker';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoFormSwitch } from '@/components/form/fields/switch';
import { AutoFormStringLanguageInput } from '@/components/form/fields/text-language-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsTrigger } from '@/components/ui/tabs';
import { useTextLang } from '@/hooks/use-text-lang';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  CreateEditFormGroupsMembersAdminArgs,
  useCreateEditFormGroupsMembersAdmin,
} from './hooks/use-create-edit-form-groups-members-admin';

enum TabsEnum {
  CONTENT = 'content',
  MAIN = 'main',
}

export const CreateEditFormGroupsMembersAdmin = ({
  data,
}: CreateEditFormGroupsMembersAdminArgs) => {
  const t = useTranslations('admin.members.groups');
  const tCore = useTranslations('core.global');
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
            active={activeTab === TabsEnum.MAIN}
            id="main"
            onClick={() => {
              setActiveTab(TabsEnum.MAIN);
            }}
          >
            {t('create_edit.main')}
          </TabsTrigger>
          <TabsTrigger
            active={activeTab === TabsEnum.CONTENT}
            id="content"
            onClick={() => {
              setActiveTab(TabsEnum.CONTENT);
            }}
          >
            {t('create_edit.content')}
          </TabsTrigger>
        </Tabs>
      </DialogHeader>

      <AutoForm
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
        fields={[
          {
            id: 'main.name',
            component: AutoFormStringLanguageInput,
            label: t('create_edit.name'),
          },
          {
            id: 'main.color',
            component: AutoFormColorPicker,
            label: t('create_edit.color'),
          },
          {
            id: 'content.files_allow_upload',
            component: AutoFormSwitch,
            label: t('create_edit.files.allow_upload'),
          },
          {
            id: 'content.files_total_max_storage',
            component: props => (
              <AutoFormInput
                {...props}
                className="max-w-32"
                disabled={
                  props.field.value.content?.files_total_max_storage === 0
                }
                min={0}
                type="number"
              />
            ),
            label: t('create_edit.files.total_max_storage'),
            wrapper: ({ field, children }) => {
              return (
                <div className="flex flex-wrap items-center">
                  {children}

                  <span>{t('create_edit.in_kb')}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <span>{tCore('or')}</span>
                    <Checkbox
                      checked={field.value === 0}
                      id="content.files_total_max_storage.unlimited"
                      onClick={() => {
                        if (field.value === 0) {
                          field.onChange(51200);

                          return;
                        }

                        field.onChange(0);
                      }}
                    />
                    <Label htmlFor="content.files_total_max_storage.unlimited">
                      {tCore('unlimited')}
                    </Label>
                  </div>
                </div>
              );
            },
          },
          {
            id: 'content.files_max_storage_for_submit',
            component: props => (
              <AutoFormInput
                {...props}
                className="max-w-32"
                disabled={
                  props.field.value.content?.files_max_storage_for_submit === 0
                }
                min={0}
                type="number"
              />
            ),
            wrapper: ({ field, children }) => (
              <div className="flex flex-wrap items-center gap-2">
                {children}
                <span>{t('create_edit.in_kb')}</span>
                <div className="flex shrink-0 items-center gap-2">
                  <span>{tCore('or')}</span>
                  <Checkbox
                    checked={field.value === 0}
                    id="content.files_max_storage_for_submit.unlimited"
                    onClick={() => {
                      if (field.value === 0) {
                        field.onChange(5120);

                        return;
                      }

                      field.onChange(0);
                    }}
                  />
                  <Label htmlFor="content.files_max_storage_for_submit.unlimited">
                    {tCore('unlimited')}
                  </Label>
                </div>
              </div>
            ),
            label: t('create_edit.files.max_storage_for_submit.label'),
          },
        ]}
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => <Button {...props}>{tCore('save')}</Button>}
      />
    </>
  );
};
