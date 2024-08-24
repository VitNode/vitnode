import { Badge } from '@/components/ui/badge';
import { HeaderContent } from '@/components/ui/header-content';
import { getSessionAdminData } from '@/graphql/get-session-admin';
import { CONFIG } from '@/helpers/config-with-env';
import { AlertTriangle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { RebuildRequiredAdmin } from '../../../global/rebuild-required';

export const DashboardCoreAdminView = async () => {
  const t = await getTranslations('core');
  const {
    admin__sessions__authorization: { version },
  } = await getSessionAdminData();

  return (
    <>
      <HeaderContent
        desc={t('version', { version })}
        h1={
          <>
            <span>VitNode</span>
            {CONFIG.node_development && (
              <Badge
                className="ml-2 bg-yellow-500 text-black hover:bg-yellow-500"
                variant="destructive"
              >
                <AlertTriangle className="size-4" /> Developer Mode
              </Badge>
            )}
          </>
        }
      />

      <RebuildRequiredAdmin />
    </>
  );
};
