import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/card';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';
import { LogoVitNode } from '@/components/logo-vitnode';
import { PoweredByVitNode } from '../global/powered-by';

interface Props {
  children: ReactNode;
}

export const LayoutConfigs = ({ children }: Props) => {
  const t = useTranslations('admin.configs');

  return (
    <div className="container my-10">
      <div className="flex items-center justify-center mb-5">
        <LogoVitNode />
      </div>

      {children}
      <Card className="sm:hidden p-5 text-center">{t('mobile_not_supported')}</Card>

      <div className="mt-5 flex flex-col justify-center items-center gap-4">
        <PoweredByVitNode />

        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
