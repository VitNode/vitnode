import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ModeratorsStaffAdminView } from '@/admin/views/members/staff/views/moderators/moderators-view';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin.members.staff.moderators' });

  return {
    title: t('title')
  };
}

export default function Page() {
  return <ModeratorsStaffAdminView />;
}
