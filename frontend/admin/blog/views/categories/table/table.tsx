"use client";

import * as React from "react";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import {
  Admin_Blog_Categories__ShowQuery,
  ShowBlogCategories
} from "@/graphql/hooks";
import { useDragAndDrop } from "@/hooks/core/drag&drop/use-functions";
import { ItemDragAndDrop } from "@/hooks/core/drag&drop/item";
import { ItemTableCategoriesCategoryAdmin } from "./item";

export const TableCategoriesCategoryAdmin = ({
  blog_categories__show: { edges }
}: Admin_Blog_Categories__ShowQuery) => {
  const [initData, setData] = React.useState<ShowBlogCategories[]>(edges);
  const data = initData.map(item => ({
    ...item,
    children: []
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
    sortedIds
  } = useDragAndDrop<ShowBlogCategories>({
    data
  });

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
          ...event
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
            draggableStyle={{
              background: item.color.replace(")", ", 0.2 )"),
              color: item.color
            }}
          >
            <ItemTableCategoriesCategoryAdmin data={item} />
          </ItemDragAndDrop>
        ))}

        <DragOverlay>
          {activeItemOverlay && (
            <ItemDragAndDrop
              {...actionsItem({
                data: activeItemOverlay
              })}
              draggableStyle={{
                background: activeItemOverlay.color.replace(")", ", 0.2 )"),
                color: activeItemOverlay.color
              }}
            >
              <ItemTableCategoriesCategoryAdmin data={activeItemOverlay} />
            </ItemDragAndDrop>
          )}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
