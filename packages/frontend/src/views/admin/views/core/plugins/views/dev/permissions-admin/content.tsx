'use client';

import { DragAndDropSortableList } from '@/components/drag&drop/sortable-list/list';
import { Admin__Core_Plugins__Permissions_Admin__ShowQuery } from '@/graphql/queries/admin/plugins/dev/permissions-admin/admin__core_plugins__permissions_admin__show.generated';

export const ContentPermissionsAdminDevPluginAdminView = ({
  admin__core_plugins__permissions_admin__show,
}: Admin__Core_Plugins__Permissions_Admin__ShowQuery) => {
  const data = admin__core_plugins__permissions_admin__show.map(item => ({
    ...item,
    children: item.children.map(child => ({
      ...child,
      children: [],
    })),
  }));

  return (
    <DragAndDropSortableList
      componentItem={data => {
        return <div>{data.id}</div>;
      }}
      data={data}
    />
  );
};
