'use client';

import { ItemDragAndDrop } from '@/components/drag&drop-item';
import { Admin__Core_Nav__ShowQuery } from '@/graphql/queries/admin/styles/nav/admin__core_nav__show.generated';
import { ShowCoreNav } from '@/graphql/types';
import { useDragAndDrop } from '@/hooks/drag&drop/use-functions';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { mutationChangePositionApi } from './hooks/mutation-change-position-api';
import { ItemContentTableContentNavAdmin } from './item';

const indentationWidth = 20;

interface Props extends Admin__Core_Nav__ShowQuery {
  icons: { icon: React.ReactNode; id: number }[];
}

export const TableNavAdmin = ({ core_nav__show: { edges }, icons }: Props) => {
  const t = useTranslations('core');
  const [initData, setData] =
    React.useState<Omit<ShowCoreNav, '__typename'>[]>(edges);
  const data = initData.map(item => ({
    ...item,
    children: item.children.map(child => ({ ...child, children: [] })),
  }));

  const {
    actionsItem,
    activeItemOverlay,
    flattenedItems,
    onDragEnd,
    onDragMove,
    onDragOver,
    onDragStart,
    resetState,
    sortedIds,
  } = useDragAndDrop<Omit<ShowCoreNav, '__typename'>>({
    data,
  });

  // Revalidate items when edges change
  React.useEffect(() => {
    setData(edges);
  }, [edges]);

  if (data.length === 0) {
    return <div className="text-center">{t('no_results')}</div>;
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragCancel={resetState}
      onDragEnd={async event => {
        const moveTo = onDragEnd<ShowCoreNav>({
          data,
          setData,
          ...event,
        });

        if (!moveTo) return;

        try {
          await mutationChangePositionApi({
            id: Number(moveTo.id),
            indexToMove: moveTo.indexToMove,
            parentId: Number(moveTo.parentId),
          });
        } catch (_) {
          toast.error(t('errors.title'), {
            description: t('errors.internal_server_error'),
          });
        }
      }}
      onDragMove={e => {
        onDragMove({ ...e, flattenedItems, indentationWidth, maxDepth: 1 });
      }}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(item => (
          <ItemDragAndDrop
            key={item.id}
            {...actionsItem({
              data: item,
              indentationWidth,
            })}
          >
            <ItemContentTableContentNavAdmin
              data={item}
              icon={
                item.icon ? icons.find(el => el.id === item.id)?.icon : null
              }
            />
          </ItemDragAndDrop>
        ))}

        <DragOverlay>
          {activeItemOverlay && (
            <ItemDragAndDrop
              {...actionsItem({
                data: activeItemOverlay,
              })}
            >
              <ItemContentTableContentNavAdmin
                data={activeItemOverlay}
                icon={
                  activeItemOverlay.icon
                    ? icons.find(el => el.id === activeItemOverlay.id)?.icon
                    : null
                }
              />
            </ItemDragAndDrop>
          )}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
