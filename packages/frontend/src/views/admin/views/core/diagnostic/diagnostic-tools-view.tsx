import { HeaderContent } from '@/components/ui/header-content';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { WarnReqRestartServer } from '../plugins/warn-req-restart-server';
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
    <>
      <HeaderContent desc={t('desc')} h1={t('title')}>
        <ActionsDiagnosticTools />
      </HeaderContent>

      <WarnReqRestartServer />
    </>
  );
};
