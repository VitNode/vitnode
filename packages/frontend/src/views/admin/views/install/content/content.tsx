'use client';

import React from 'react';

import { WelcomeInstallConfigsView } from './steps/welcome';
import { InstallVitNodeContext } from './hooks/use-install-vitnode';
import { LicenseInstallConfigsView } from './steps/license/license-install-configs-view';
import { DatabaseInstallConfigsView } from './steps/database/database-install-configs-view';
import { AccountInstallConfigsView } from './steps/account/account-install-configs-view';
import { FinishInstallConfigsView } from './finish/finish-install-config-view';
import { LayoutAdminInstallEnum } from '@/graphql/graphql';
import { ItemStepProps, Steps } from '@/components/ui/steps';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  data: LayoutAdminInstallEnum;
}

export const ContentInstallConfigsView = ({ data }: Props) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const items: ItemStepProps[] = [
    {
      id: 'welcome',
      title: 'Welcome',
      description: 'Before you begin...',
      checked: currentStep >= 1,
      component: <WelcomeInstallConfigsView />,
    },
    {
      id: 'license',
      title: 'License',
      description: 'Read carefully',
      checked: currentStep >= 2,
      component: <LicenseInstallConfigsView />,
    },
    {
      id: 'database',
      title: 'Database',
      description: 'Create schema and first records',
      checked: currentStep >= 3,
      component: <DatabaseInstallConfigsView />,
    },
    {
      id: 'account',
      title: 'Admin Account',
      description: 'Create admin account',
      checked: currentStep >= 4,
      component: <AccountInstallConfigsView />,
    },
  ];

  React.useEffect(() => {
    if (data === LayoutAdminInstallEnum.finish) {
      setCurrentStep(4);
    }

    if (currentStep < 2) {
      return;
    }

    if (data === LayoutAdminInstallEnum.account && currentStep < 3) {
      setCurrentStep(3);
    }
  }, [data, currentStep]);

  if (currentStep === items.length) {
    return <FinishInstallConfigsView />;
  }

  return (
    <Card className="hidden sm:flex">
      <Steps className="max-w-64 p-5 pr-0" items={items} />

      <div className="grow">
        <CardHeader>
          <CardDescription>Install VitNode</CardDescription>
          <CardTitle>{items.at(currentStep)?.title}</CardTitle>
        </CardHeader>

        <InstallVitNodeContext.Provider
          value={{
            currentStep,
            setCurrentStep,
          }}
        >
          {items.at(currentStep)?.component}
        </InstallVitNodeContext.Provider>
      </div>
    </Card>
  );
};
