import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeaderContent } from '@/components/ui/header-content';
import { getSessionAdminData } from '@/graphql/get-session-admin-data';
import { CONFIG } from '@/helpers/config-with-env';
import { Link } from '@/navigation';
import { AlertTriangle, HammerIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { WarnReqRestartServer } from '../plugins/warn-req-restart-server';
import { Test } from './test';

export const DashboardCoreAdminView = async () => {
  const [
    {
      admin__sessions__authorization: { version },
    },
    t,
  ] = await Promise.all([
    getSessionAdminData(),
    getTranslations('admin.global'),
  ]);

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
                <AlertTriangle className="size-4" /> {t('dev_mode')}
              </Badge>
            )}
          </>
        }
      >
        <Button asChild>
          <Link href="/admin/core/diagnostic">
            <HammerIcon />
            {t('diagnostic_tools')}
          </Link>
        </Button>
      </HeaderContent>

      <WarnReqRestartServer />

      <Test />
    </>
  );
};
