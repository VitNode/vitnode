'use client';

import { DragAndDropSortableList } from '@/components/drag&drop/sortable-list/list';
import { Admin__Core_Plugins__Nav__ShowQuery } from '@/graphql/queries/admin/plugins/dev/nav/admin__core_plugins__nav__show.generated';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { mutationChangePositionApi } from './item/hooks/mutation-change-position-api';

interface Props extends Admin__Core_Plugins__Nav__ShowQuery {
  icons: { icon: React.ReactNode; id: string }[];
}

export const ContentNavDevPluginAdmin = ({
  admin__core_plugins__nav__show: edges,
  icons,
}: Props) => {
  const t = useTranslations('core');
  const { code } = useParams();

  return (
    <DragAndDropSortableList
      componentItem={data => {
        // TODO: Implement the componentItem function
        return <div>test</div>;
      }}
      data={edges.map(item => ({
        ...item,
        children:
          item.children?.map(child => ({
            ...child,
            id: child.code,
            children: [],
          })) ?? [],
        id: item.code,
      }))}
      maxDepth={1}
      onDragEnd={async moveTo => {
        if (!code) return;

        const mutation = await mutationChangePositionApi({
          code: moveTo.id.toString(),
          pluginCode: Array.isArray(code) ? code[0] : code,
          indexToMove: moveTo.indexToMove,
          parentCode: moveTo.parentId?.toString(),
        });

        if (mutation.error) {
          toast.error(t('errors.title'), {
            description: t('errors.internal_server_error'),
          });
        }
      }}
    />
  );
};
