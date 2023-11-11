import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/card';
import { Link } from '@/i18n';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';

interface Props {
  children: ReactNode;
}

export const LayoutConfigs = ({ children }: Props) => {
  const t = useTranslations('admin.configs');

  return (
    <div className="container my-10">
      <div className="flex items-center justify-center mb-5">VitNode</div>

      {children}
      <Card className="sm:hidden p-6 text-center">{t('mobile_not_supported')}</Card>

      <div className="mt-5 flex flex-col justify-center items-center gap-4">
        <div className="text-center text-muted-foreground">
          <span>Powered by </span>
          <Link href="https://vitnode.com/" target="_blank" rel="noopener noreferrer">
            VitNode
          </Link>
        </div>

        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
