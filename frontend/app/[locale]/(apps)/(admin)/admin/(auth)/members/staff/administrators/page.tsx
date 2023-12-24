import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { AdministratorsStaffAdminView } from '@/admin/views/members/staff/views/administrators-view';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin.members.staff.administrators' });

  return {
    title: t('title')
  };
}

export default function Page() {
  return <AdministratorsStaffAdminView />;
}
