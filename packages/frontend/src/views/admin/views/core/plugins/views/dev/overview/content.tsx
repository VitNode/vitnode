'use client';

import { Button } from '@/components/ui/button';
import { ShowAdminPlugins } from '@/graphql/types';
import { useTranslations } from 'next-intl';

import { FormCreateEditPluginAdmin } from '../../../actions/create/form';

export const ContentOverviewDevPluginAdmin = (data: ShowAdminPlugins) => {
  const t = useTranslations('core');

  return (
    <FormCreateEditPluginAdmin
      className="max-w-xl"
      data={data}
      submitButton={props => <Button {...props}>{t('edit')}</Button>}
    />
  );
};
