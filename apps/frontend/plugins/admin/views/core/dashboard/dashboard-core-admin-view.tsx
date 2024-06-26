import { AlertTriangle } from 'lucide-react';
import { Badge } from 'vitnode-frontend/components/ui/badge';
import { CONFIG } from 'vitnode-frontend/helpers/config-with-env';

import { HeaderContent } from '@/components/header-content/header-content';
import { VersionDashboardCoreAdmin } from './version';
import { RebuildRequiredAdmin } from '@/plugins/admin/global/rebuild-required';

// interface Props {
//   data: Admin__Core__DashboardQuery;
// }

export const DashboardCoreAdminView = () => {
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
        desc={<VersionDashboardCoreAdmin />}
      />

      <RebuildRequiredAdmin />
    </>
  );
};
