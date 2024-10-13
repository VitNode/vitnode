'use client';

import { DragAndDropSortableList } from '@/components/drag&drop/sortable-list/list';
import { Admin__Core_Plugins__Permissions_Admin__ShowQuery } from '@/graphql/queries/admin/plugins/dev/permissions-admin/admin__core_plugins__permissions_admin__show.generated';

import { ItemPermissionsAdminDevPluginAdmin } from './item/item';

export const ContentPermissionsAdminDevPluginAdminView = (
  dataFromSSR: Admin__Core_Plugins__Permissions_Admin__ShowQuery,
) => {
  const data = dataFromSSR.admin__core_plugins__permissions_admin__show.map(
    item => ({
      ...item,
      children: item.children.map(child => ({
        id: child,
        children: [],
      })),
    }),
  );

  return (
    <DragAndDropSortableList
      componentItem={(data, parentId) => {
        return (
          <ItemPermissionsAdminDevPluginAdmin
            {...data}
            children={data.children.map(child => child.id)}
            dataFromSSR={dataFromSSR}
            parentId={parentId?.toString()}
          />
        );
      }}
      data={data}
      maxDepth={1}
    />
  );
};
