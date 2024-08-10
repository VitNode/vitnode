'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { ShowAdminPlugins } from '@/graphql/types';

import { FormCreateEditPluginAdmin } from '../../../actions/create/form';

export const ContentOverviewDevPluginAdmin = (data: ShowAdminPlugins) => {
  const t = useTranslations('core');

  return (
    <FormCreateEditPluginAdmin
      data={data}
      className="max-w-xl"
      submitButton={props => <Button {...props}>{t('edit')}</Button>}
    />
  );
};
