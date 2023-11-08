'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { useSelectedLayoutSegment } from 'next/navigation';

import { ItemStepProps, Steps } from '@/components/steps/steps';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
}

export const LayoutInstallConfigsView = ({ children }: Props) => {
  const t = useTranslations('admin.configs.install');
  const segment = useSelectedLayoutSegment();

  const stepsNumber: {
    [key: string]: number;
  } = {
    license: 2,
    requirements: 3,
    database: 4,
    account: 5
  };

  const activeStep = segment ? stepsNumber[segment] : 1;

  const items: ItemStepProps[] = [
    {
      id: 'welcome',
      title: t('steps.step_1.title'),
      description: t('steps.step_1.desc'),
      checked: activeStep >= 2
    },
    {
      id: 'license',
      title: t('steps.step_2.title'),
      description: t('steps.step_2.desc'),
      checked: activeStep >= 3
    },
    {
      id: 'requirements',
      title: 'requirements',
      description: 'requirements_description',
      checked: activeStep >= 4
    },
    {
      id: 'database',
      title: 'database',
      description: 'database_description',
      checked: activeStep >= 5
    },
    {
      id: 'account',
      title: 'account',
      description: 'account_description',
      checked: activeStep >= 6
    }
  ];

  return (
    <>
      <Steps className="p-6" items={items} />

      <div>
        <CardHeader>
          <CardDescription>{t('title', { name: 'VitNode' })}</CardDescription>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <CardTitle>{t(`steps.step_${activeStep}.title`)}</CardTitle>
        </CardHeader>
        {children}
      </div>
    </>
  );
};
