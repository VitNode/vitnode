import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { Tabs } from '@/components/tabs/tabs';

interface Props {
  children: ReactNode;
}

export const StaffAdminLayout = ({ children }: Props) => {
  const t = useTranslations('admin.members.staff');

  return (
    <>
      <Tabs
        className="mb-5"
        items={[
          {
            id: 'moderators',
            text: t('moderators.title'),
            href: '/admin/members/staff/moderators'
          },
          {
            id: 'administrators',
            text: t('administrators.title'),
            href: '/admin/members/staff/administrators'
          }
        ]}
      />

      {children}
    </>
  );
};
