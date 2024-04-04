import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { ItemContentTableContentNavAdmin } from "./item";
import type { Admin__Core_Nav__ShowQuery, ShowCoreNav } from "@/graphql/hooks";
import { mutationChangePositionApi } from "./hooks/mutation-change-position-api";
import { useDragAndDrop } from "@/hooks/core/drag&drop/use-functions";
import { ItemDragAndDrop } from "@/hooks/core/drag&drop/item";

const indentationWidth = 20;

export const ContentTableContentNavAdmin = ({
  core_nav__show: { edges }
}: Admin__Core_Nav__ShowQuery) => {
  const t = useTranslations("core");
  const [initData, setData] =
    useState<Omit<ShowCoreNav, "__typename">[]>(edges);
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
  useEffect(() => {
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

        await mutationChangePositionApi(moveTo);
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
            >
              <ItemContentTableContentNavAdmin data={activeItemOverlay} />
            </ItemDragAndDrop>
          )}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
