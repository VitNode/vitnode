import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/card';
import { Link } from '@/i18n';

interface Props {
  children: ReactNode;
}

export const LayoutConfigs = ({ children }: Props) => {
  const t = useTranslations('admin.configs');

  return (
    <div className="container my-10 py-10">
      <div className="flex items-center justify-center mb-5">VitNode</div>

      <Card className="hidden sm:block">{children}</Card>
      <Card className="sm:hidden p-6 text-center">{t('mobile_not_supported')}</Card>

      <div className="text-center mt-5 text-muted-foreground">
        <span>Powered by </span>
        <Link href="https://vitnode.com/" target="_blank" rel="noopener noreferrer">
          VitNode
        </Link>
      </div>
    </div>
  );
};
