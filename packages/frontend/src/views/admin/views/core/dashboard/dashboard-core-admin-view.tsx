import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeaderContent } from '@/components/ui/header-content';
import { getSessionAdminData } from '@/graphql/get-session-admin';
import { CONFIG } from '@/helpers/config-with-env';
import { Link } from '@/navigation';
import { AlertTriangle, HammerIcon, TerminalIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { RebuildRequiredAdmin } from '../../../global/rebuild-required';

export const DashboardCoreAdminView = async () => {
  const [
    {
      admin__sessions__authorization: { version },
    },
    t,
  ] = await Promise.all([getSessionAdminData(), getTranslations('admin')]);

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
      >
        <Button asChild>
          <Link href="/admin/core/diagnostic">
            <HammerIcon />
            {t('core.diagnostic.title')}
          </Link>
        </Button>
      </HeaderContent>

      <div className="max-w-3xl space-y-6 p-32">
        <Alert>
          <TerminalIcon className="size-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>

        <Alert variant="error">
          <TerminalIcon className="size-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>

        <Alert variant="warn">
          <TerminalIcon className="size-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>

        <Alert variant="primary">
          <TerminalIcon className="size-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>

      <RebuildRequiredAdmin />
    </>
  );
};
