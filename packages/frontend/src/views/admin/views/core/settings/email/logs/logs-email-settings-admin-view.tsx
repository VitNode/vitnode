import { HeaderContent } from '@/components/ui/header-content';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContentLogsEmailSettingsAdmin } from './content';

export const generateMetadataLogsEmailSettingsAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin.core.settings.email.logs');

    return {
      title: t('title'),
    };
  };

export const LogsEmailSettingsAdminView = async () => {
  const t = await getTranslations('admin.core.settings.email.logs');

  return (
    <>
      <HeaderContent h1={t('title')} />

      <ContentLogsEmailSettingsAdmin />
    </>
  );
};
