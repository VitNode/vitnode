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
    database: 3,
    account: 4
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
      id: 'database',
      title: t('steps.step_3.title'),
      description: t('steps.step_3.desc'),
      checked: activeStep >= 4
    },
    {
      id: 'account',
      title: t('steps.step_4.title'),
      description: t('steps.step_4.desc'),
      checked: activeStep >= 5
    }
  ];

  return (
    <>
      <Steps className="p-6 max-w-[16rem]" items={items} />

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
