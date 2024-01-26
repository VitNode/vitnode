import { HeaderContent } from '@/components/header-content/header-content';
import { useTranslations } from 'next-intl';

export const ThemesAdminView = () => {
  const t = useTranslations('admin.core.styles.themes');

  return (
    <>
      <HeaderContent h1={t('title')} />

      <div>test</div>
    </>
  );
};
