'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { useSelectedLayoutSegment } from 'next/navigation';

import { ItemStepProps, Steps } from '@/components/steps/steps';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLayoutInstallConfigsAPI } from './hooks/use-layout-install-configs-api';
import { LoadingView } from '@/themes/default/core/views/global/loading/loading-view';
import { InternalErrorView } from '@/admin/global/internal-error-view';
import { LayoutAdminInstallEnum } from '@/graphql/hooks';
import { FinishInstallConfigsView } from './finish/finish-install-config-view';

interface Props {
  children: ReactNode;
}

export const LayoutInstallConfigsView = ({ children }: Props) => {
  const t = useTranslations('admin.configs.install');
  const segment = useSelectedLayoutSegment();
  const { data, isError, isLoading } = useLayoutInstallConfigsAPI();

  const stepsNumber: {
    [key: string]: number;
  } = {
    license: 2,
    database: 3,
    account: 4
  };

  const activeStep = segment ? stepsNumber[segment] : 1;

  const items: ItemStepProps[] = [
    {
      id: 'welcome',
      title: t('steps.welcome.title'),
      description: t('steps.welcome.desc'),
      checked: activeStep >= 2
    },
    {
      id: 'license',
      title: t('steps.license.title'),
      description: t('steps.license.desc'),
      checked: activeStep >= 3
    },
    {
      id: 'database',
      title: t('steps.database.title'),
      description: t('steps.database.desc'),
      checked: activeStep >= 4
    },
    {
      id: 'account',
      title: t('steps.account.title'),
      description: t('steps.account.desc'),
      checked: activeStep >= 5
    }
  ];

  if (isLoading) return <LoadingView />;
  if (isError || !data) return <InternalErrorView />;
  if (data.admin_install__layout.status === LayoutAdminInstallEnum.finish) {
    return <FinishInstallConfigsView />;
  }

  return (
    <Card className="hidden sm:flex">
      <Steps className="p-6 max-w-[16rem] pr-0" items={items} />

      <div className="flex-grow">
        <CardHeader>
          <CardDescription>{t('title', { name: 'VitNode' })}</CardDescription>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <CardTitle>{t(`steps.${items.at(activeStep - 1)?.id}.title`)}</CardTitle>
        </CardHeader>
        {children}
      </div>
    </Card>
  );
};
