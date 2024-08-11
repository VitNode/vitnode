import { useTranslations } from 'next-intl';
import React from 'react';

import { useDownloadLangAdmin } from './hooks/use-download-lang-admin';
import { Loader } from '@/components/ui/loader';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShowCoreLanguages } from '@/graphql/types';
import { AutoForm } from '@/components/ui/auto-form';
import { AutoFormSwitch } from '@/components/ui/auto-form/fields/switch';
import { AutoFormCombobox } from '@/components/ui/auto-form/fields/combobox';
import {
  AutoFormInputComponentProps,
  DependencyType,
} from '@/components/ui/auto-form/type';

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
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => (
          <DialogFooter>
            <Button {...props}>{t('submit')}</Button>
          </DialogFooter>
        )}
        fieldConfig={{
          all: {
            label: t('all.label'),
            description: t('all.desc'),
            fieldType: AutoFormSwitch,
          },
          plugins: {
            label: t('plugins'),
            fieldType: (props: AutoFormInputComponentProps) => (
              <AutoFormCombobox
                {...props}
                labels={Object.fromEntries(
                  plugins.map(plugin => [
                    plugin.code,
                    <div className="flex flex-wrap gap-2" key={plugin.code}>
                      <span className="font-semibold">{plugin.name}</span>
                      <span>{plugin.version}</span>
                    </div>,
                  ]),
                )}
                multiple
              />
            ),
          },
        }}
        dependencies={[
          {
            sourceField: 'all',
            type: DependencyType.HIDES,
            targetField: 'plugins',
            when: (provider: boolean) => !!provider,
          },
        ]}
      />
    </>
  );
};
