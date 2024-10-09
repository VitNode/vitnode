import { Admin__Core_Plugins__Permissions_Admin__ShowQuery } from '@/graphql/queries/admin/plugins/dev/permissions-admin/admin__core_plugins__permissions_admin__show.generated';

import { ActionsItemPermissionsAdminDevPluginAdmin } from './actions/actions';

export const ItemPermissionsAdminDevPluginAdmin = ({
  id,
  parentId,
  dataFromSSR,
  children,
}: {
  dataFromSSR: Admin__Core_Plugins__Permissions_Admin__ShowQuery;
  parentId: string | undefined;
} & Admin__Core_Plugins__Permissions_Admin__ShowQuery['admin__core_plugins__permissions_admin__show'][0]) => {
  return (
    <div className="flex flex-1 items-center gap-4">
      {id}
      <ActionsItemPermissionsAdminDevPluginAdmin
        data={{ id, children }}
        dataFromSSR={dataFromSSR}
        parentId={parentId}
      />
    </div>
  );
};
