import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';

export const ForumsForumAdminView = () => {
  const t = useTranslations('admin.forum.forums');

  return (
    <>
      <HeaderContent h1={t('title')} />

      <div>ForumsForumAdminView</div>
    </>
  );
};
