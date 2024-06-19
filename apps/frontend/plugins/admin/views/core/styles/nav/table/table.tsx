"use client";

import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import * as React from "react";
import { useTranslations } from "next-intl";

import { ItemContentTableContentNavAdmin } from "./item";
import { Admin__Core_Nav__ShowQuery, ShowCoreNav } from "@/graphql/hooks";
import { mutationChangePositionApi } from "./hooks/mutation-change-position-api";
import { useDragAndDrop } from "@/plugins/core/hooks/drag&drop/use-functions";
import { ItemDragAndDrop } from "@/plugins/core/hooks/drag&drop/item";

const indentationWidth = 20;

interface Props extends Admin__Core_Nav__ShowQuery {
  icons: { icon: React.ReactNode; id: number }[];
}

export const TableNavAdmin = ({ core_nav__show: { edges }, icons }: Props) => {
  const t = useTranslations("core");
  const [initData, setData] =
    React.useState<Omit<ShowCoreNav, "__typename">[]>(edges);
  const data = initData.map(item => ({
    ...item,
    children: item.children.map(child => ({ ...child, children: [] }))
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
  } = useDragAndDrop<Omit<ShowCoreNav, "__typename">>({
    data
  });

  // Revalidate items when edges change
  React.useEffect(() => {
    if (!edges || !data) return;

    setData(edges);
  }, [edges]);

  if (!data || data.length === 0) {
    return <div className="text-center">{t("no_results")}</div>;
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragCancel={resetState}
      onDragOver={onDragOver}
      onDragMove={e =>
        onDragMove({ ...e, flattenedItems, indentationWidth, maxDepth: 1 })
      }
      onDragStart={onDragStart}
      onDragEnd={async event => {
        const moveTo = onDragEnd<ShowCoreNav>({
          data,
          setData,
          ...event
        });

        if (!moveTo) return;

        await mutationChangePositionApi({
          id: Number(moveTo.id),
          indexToMove: moveTo.indexToMove,
          parentId: Number(moveTo.parentId)
        });
      }}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(item => (
          <ItemDragAndDrop
            key={item.id}
            {...actionsItem({
              data: item,
              indentationWidth
            })}
            draggableChildren={
              item.icon ? icons.find(el => el.id === item.id)?.icon : null
            }
          >
            <ItemContentTableContentNavAdmin data={item} />
          </ItemDragAndDrop>
        ))}

        <DragOverlay>
          {activeItemOverlay && (
            <ItemDragAndDrop
              {...actionsItem({
                data: activeItemOverlay
              })}
              draggableChildren={
                activeItemOverlay.icon
                  ? icons.find(el => el.id === activeItemOverlay.id)?.icon
                  : null
              }
            >
              <ItemContentTableContentNavAdmin data={activeItemOverlay} />
            </ItemDragAndDrop>
          )}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
