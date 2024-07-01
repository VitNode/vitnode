'use client';

import * as React from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTranslations } from 'next-intl';
import { useDragAndDrop } from 'vitnode-frontend/hooks/drag&drop/use-functions';
import { ItemDragAndDrop } from 'vitnode-frontend/components/drag&drop-item';

import { ItemCategoriesCategoryAdmin } from './item/item';
import {
  Admin_Blog_Categories__ShowQuery,
  ShowBlogCategories,
} from '@/utils/graphql';

export const CategoriesBlogAdminView = ({
  blog_categories__show: { edges },
}: Admin_Blog_Categories__ShowQuery) => {
  const t = useTranslations('core');
  const [initData, setData] = React.useState<ShowBlogCategories[]>(edges);
  const data = initData.map(item => ({
    ...item,
    children: [],
  }));

  // Update data when edges change
  React.useEffect(() => {
    setData(edges);
  }, [edges]);

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
  } = useDragAndDrop<ShowBlogCategories>({
    data,
  });

  if (!data.length) {
    return <div className="text-center">{t('no_results')}</div>;
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragCancel={resetState}
      onDragOver={onDragOver}
      onDragMove={e => onDragMove({ ...e, flattenedItems, maxDepth: 0 })}
      onDragStart={onDragStart}
      onDragEnd={async event => {
        const moveTo = onDragEnd<ShowBlogCategories>({
          data,
          setData,
          ...event,
        });

        if (!moveTo) return;

        // await mutationChangePositionApi(moveTo);
      }}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(item => (
          <ItemDragAndDrop
            key={item.id}
            {...actionsItem({ data: item })}
            // draggableStyle={{
            //   background: item.color.replace(')', ', 0.2 )'),
            //   color: item.color,
            // }}
          >
            <ItemCategoriesCategoryAdmin data={item} />
          </ItemDragAndDrop>
        ))}

        <DragOverlay>
          {activeItemOverlay && (
            <ItemDragAndDrop
              {...actionsItem({
                data: activeItemOverlay,
              })}
              // draggableStyle={{
              //   background: activeItemOverlay.color.replace(')', ', 0.2 )'),
              //   color: activeItemOverlay.color,
              // }}
            >
              <ItemCategoriesCategoryAdmin data={activeItemOverlay} />
            </ItemDragAndDrop>
          )}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
