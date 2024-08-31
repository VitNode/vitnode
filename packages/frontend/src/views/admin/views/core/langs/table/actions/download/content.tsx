import { AutoForm } from '@/components/auto-form/auto-form';
import {
  AutoFormCombobox,
  AutoFormComboboxProps,
} from '@/components/auto-form/fields/combobox';
import { AutoFormSwitch } from '@/components/auto-form/fields/switch';
import { DependencyType } from '@/components/form/type';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { ShowCoreLanguages } from '@/graphql/types';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useDownloadLangAdmin } from './hooks/use-download-lang-admin';
export const ContentDownloadActionsTableLangsCoreAdmin = ({
  code,
}: Pick<ShowCoreLanguages, 'code'>) => {
  const t = useTranslations('admin.core.langs.actions.download');
  const { onSubmit, queryPlugins, formSchema, plugins } = useDownloadLangAdmin({
    code,
  });
  const { data } = queryPlugins;

  if (queryPlugins.isLoading || !data) {
    return <Loader />;
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('title', { code })}</DialogTitle>
        <DialogDescription>{t('desc')}</DialogDescription>
      </DialogHeader>

      <AutoForm
        dependencies={[
          {
            sourceField: 'all',
            type: DependencyType.HIDES,
            targetField: 'plugins',
            when: (provider: boolean) => !!provider,
          },
        ]}
        fields={[
          {
            id: 'all',
            component: AutoFormSwitch,
            label: t('all.label'),
            description: t('all.desc'),
          },
          {
            id: 'plugins',
            label: t('plugins'),
            component: AutoFormCombobox,
            componentProps: {
              labels: Object.fromEntries(
                plugins.map(plugin => [
                  plugin.code,
                  <div className="flex flex-wrap gap-2" key={plugin.code}>
                    <span className="font-semibold">{plugin.name}</span>
                    <span>{plugin.version}</span>
                  </div>,
                ]),
              ),
              multiple: true,
            } as AutoFormComboboxProps,
          },
        ]}
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => (
          <DialogFooter>
            <Button {...props}>{t('submit')}</Button>
          </DialogFooter>
        )}
      />
    </>
  );
};
