import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
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

export const ContentTableNavDevPluginAdmin = ({
  admin__core_plugins__nav__show: edges
}: Admin__Core_Plugins__Nav__ShowQuery) => {
  const t = useTranslations("core");
  const [data, setData] = useState<ShowAdminNavPluginsObj[]>(edges);
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

  // Revalidate items when edges change
  useEffect(() => {
    if (!edges || !data) return;

    setData(edges);
  }, [edges]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

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
      sensors={sensors}
      collisionDetection={closestCorners}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always
        }
      }}
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
          <ItemContentTableNavDevPluginAdmin
            key={item.id}
            isDropHere={projected?.parentId === item.id}
            active={activeId === item.id}
            {...item}
          />
        ))}

        <DragOverlay>
          {activeId !== null && activeItem && (
            <ItemContentTableNavDevPluginAdmin {...activeItem} />
          )}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
