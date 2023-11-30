import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { ActionsForumsForumAdmin } from './actions/actions-forums-forum-admin';

export const ForumsForumAdminView = () => {
  const t = useTranslations('admin.forum.forums');

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsForumsForumAdmin />
      </HeaderContent>

      <div>ForumsForumAdminView</div>
    </>
  );
};
