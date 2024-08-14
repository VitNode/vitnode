import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { HeaderContent } from '@/components/ui/header-content';
import { ActionsDiagnosticTools } from './actions/actions';

export const generateMetadataDiagnosticAdmin = async (): Promise<Metadata> => {
  const t = await getTranslations('admin.core.diagnostic');

  return {
    title: t('title'),
  };
};

export const DiagnosticToolsView = () => {
  const t = useTranslations('admin.core.diagnostic');

  return (
    <HeaderContent h1={t('title')} desc={t('desc')}>
      <ActionsDiagnosticTools />
    </HeaderContent>
  );
};
