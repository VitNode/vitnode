import { useTranslations } from 'next-intl';
import { AlertTriangle } from 'lucide-react';

import corePackages from '@/package.json';
import { HeaderContent } from '@/components/header-content/header-content';
import { Badge } from '@/components/ui/badge';

export const DashboardCoreAdminView = () => {
  const t = useTranslations('core');

  return (
    <>
      <HeaderContent
        h1={
          <>
            <span>VitNode</span>
            {process.env.NODE_ENV === 'development' && (
              <Badge
                variant="destructive"
                className="ml-2 bg-yellow-500 text-black hover:bg-yellow-500"
              >
                <AlertTriangle className="size-4" /> Developer Mode
              </Badge>
            )}
          </>
        }
        desc={t('version', { version: corePackages.version })}
      />
    </>
  );
};
