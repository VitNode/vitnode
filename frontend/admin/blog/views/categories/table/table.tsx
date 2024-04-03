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

export const TableCategoriesCategoryAdmin = ({
  blog_categories__show: { edges }
}: Admin_Blog_Categories__ShowQuery) => {
  const t = useTranslations("core");
  const [data] = useState<ShowBlogCategories[]>(edges);
  const { flattItems, onDragOver, resetState } = useDragAndDrop();
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
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(item => (
          <div key={item.id}>{item.id}</div>
        ))}
      </SortableContext>
    </DndContext>
  );
};
