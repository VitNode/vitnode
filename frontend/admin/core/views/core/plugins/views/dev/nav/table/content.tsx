import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { useDragAndDrop } from "@/hooks/core/drag&drop/use-functions";
import type {
  Admin__Core_Plugins__Nav__ShowQuery,
  ShowAdminNavPluginsObj
} from "@/graphql/hooks";
import { ItemContentTableNavDevPluginAdmin } from "./item";
import { mutationChangePositionApi } from "./hooks/mutation-change-position-api";
import { ItemDragAndDrop } from "@/hooks/core/drag&drop/item";

export const ContentTableNavDevPluginAdmin = ({
  admin__core_plugins__nav__show: edges
}: Admin__Core_Plugins__Nav__ShowQuery) => {
  const t = useTranslations("core");
  const [data, setData] = useState<ShowAdminNavPluginsObj[]>(edges);
  const {
    actionsItemDragAndDrop,
    activeId,
    flattItems,
    onDragEnd,
    onDragMove,
    onDragOver,
    onDragStart,
    projected,
    resetState
  } = useDragAndDrop();

  // Revalidate items when edges change
  useEffect(() => {
    if (!edges || !data) return;

    setData(edges);
  }, [edges]);

  const flattenedItems = flattItems({
    data: data.map(item => ({ ...item, children: [] }))
  });
  const activeItem = flattenedItems.find(i => i.id === activeId);
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
      onDragEnd={async event => {
        const moveTo = onDragEnd<ShowAdminNavPluginsObj>({
          data: data.map(item => ({ ...item, children: [] })),
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
            {...actionsItemDragAndDrop({
              data: item
            })}
          >
            <ItemContentTableNavDevPluginAdmin data={item} />
          </ItemDragAndDrop>
        ))}

        {/* <DragOverlay>
          {activeId !== null && activeItem && (
            <ItemContentTableNavDevPluginAdmin {...activeItem} />
          )}
        </DragOverlay> */}
      </SortableContext>
    </DndContext>
  );
};
