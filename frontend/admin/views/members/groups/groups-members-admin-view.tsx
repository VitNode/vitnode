import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';

import { HeaderContent } from '@/components/header-content/header-content';
import { TableGroupsMembersAdmin } from './table/table-groups-members-admin';
import { Link } from '@/i18n';
import { buttonVariants } from '@/components/ui/button';

export const GroupsMembersAdminView = () => {
  const t = useTranslations('admin.members.groups');
  const tCore = useTranslations('core');

  return (
    <>
      <HeaderContent h1={t('title')}>
        <Link
          href="/admin/members/groups/create"
          className={buttonVariants({
            variant: 'default'
          })}
        >
          <Plus />
          {tCore('create')}
        </Link>
      </HeaderContent>
      <TableGroupsMembersAdmin />
    </>
  );
};
