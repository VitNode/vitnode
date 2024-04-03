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
  const [data, setData] = useState<Omit<ShowCoreNav, "__typename">[]>(edges);

  const {
    actionsItemDragAndDrop,
    activeItemOverlay,
    flattenedItems,
    onDragEnd,
    onDragMove,
    onDragOver,
    onDragStart,
    resetState,
    sortedIds
  } = useDragAndDrop<Omit<ShowCoreNav, "__typename">>({
    data: data.map(item => ({
      ...item,
      children: item.children.map(child => ({ ...child, children: [] }))
    }))
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
          data: data.map(item => ({
            ...item,
            children: item.children.map(child => ({ ...child, children: [] }))
          })),
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
            childrenLength={item.children.length}
            {...actionsItemDragAndDrop({
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
              {...actionsItemDragAndDrop({
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
