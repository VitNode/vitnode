import { HeaderContent } from '@/components/ui/header-content';
import { useTranslations } from 'next-intl';

export const PermissionsAdminDevPluginAdminView = () => {
  const t = useTranslations('admin.core.plugins.dev.permissions-admin');

  return (
    <>
      <HeaderContent h1={t('title')} />
    </>
  );
};
