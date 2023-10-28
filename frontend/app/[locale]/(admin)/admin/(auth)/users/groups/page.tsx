import { Metadata } from 'next';
import { getTranslator } from 'next-intl/server';

import { GroupsUsersAdminView } from '@/admin/views/users/groups/groups-users-admin-view';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslator(locale, 'admin');

  return {
    title: t('users.groups.title')
  };
}

export default function Page() {
  return <GroupsUsersAdminView />;
}
