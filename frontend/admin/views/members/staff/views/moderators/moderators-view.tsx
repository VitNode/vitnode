import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';

export const ModeratorsStaffAdminView = () => {
  const t = useTranslations('admin.members.staff.moderators');

  return (
    <>
      <HeaderContent h1={t('title')}>elo123</HeaderContent>
      <div>ModeratorsStaffAdminView</div>
    </>
  );
};
