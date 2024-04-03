"use client";

import { useMemo, useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";

import type {
  Admin_Blog_Categories__ShowQuery,
  ShowBlogCategories
} from "@/graphql/hooks";
import { useDragAndDrop } from "@/hooks/core/drag&drop/use-functions";
import { ItemTableCategoriesCategoryAdmin } from "./item";
import { ItemDragAndDrop } from "@/hooks/core/drag&drop/item";

export const TableCategoriesCategoryAdmin = ({
  blog_categories__show: { edges }
}: Admin_Blog_Categories__ShowQuery) => {
  const t = useTranslations("core");
  const [data, setData] = useState<ShowBlogCategories[]>(edges);
  const {
    activeId,
    flattItems,
    onDragEnd,
    onDragMove,
    onDragOver,
    onDragStart,
    projected,
    resetState
  } = useDragAndDrop();
  const flattenedItems = flattItems({
    data: data.map(item => ({ ...item, children: [] }))
  });
  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems]
  );

  if (!data || data.length === 0) {
    return <div className="text-center">{t("no_results")}</div>;
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragCancel={resetState}
      onDragOver={onDragOver}
      onDragMove={e => onDragMove({ ...e, flattenedItems, maxDepth: 0 })}
      onDragStart={onDragStart}
      onDragEnd={async ({ active, over, ...rest }) => {
        const moveTo = onDragEnd<ShowBlogCategories>({
          active,
          over,
          data: data.map(item => ({ ...item, children: [] })),
          setData,
          ...rest
        });

        if (!moveTo) return;

        // await mutationChangePositionApi(moveTo);
      }}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(item => (
          <ItemDragAndDrop
            key={item.id}
            isDropHere={projected?.parentId === item.id}
            active={activeId === item.id}
            id={item.id}
          >
            <ItemTableCategoriesCategoryAdmin data={item} />
          </ItemDragAndDrop>
        ))}
      </SortableContext>
    </DndContext>
  );
};
