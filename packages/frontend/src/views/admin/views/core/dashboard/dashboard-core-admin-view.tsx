import { AlertTriangle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { getSessionAdminData } from '../../../../../graphql/get-session-admin';
import { HeaderContent } from '../../../../../components/ui/header-content';
import { CONFIG } from '../../../../../helpers/config-with-env';
import { Badge } from '../../../../../components/ui/badge';

export const DashboardCoreAdminView = async () => {
  const t = await getTranslations('core');
  const {
    admin__sessions__authorization: { version },
  } = await getSessionAdminData();

  return (
    <>
      <HeaderContent
        h1={
          <>
            <span>VitNode</span>
            {CONFIG.node_development && (
              <Badge
                variant="destructive"
                className="ml-2 bg-yellow-500 text-black hover:bg-yellow-500"
              >
                <AlertTriangle className="size-4" /> Developer Mode
              </Badge>
            )}
          </>
        }
        desc={t('version', { version })}
      />

      {/* // TODO: Add the following components */}
      {/* <RebuildRequiredAdmin /> */}
    </>
  );
};
