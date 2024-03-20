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
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import {
  useProjection,
  type ProjectionReturnType
} from "@/hooks/core/drag&drop/use-projection";
import {
  useDragAndDrop,
  type FlatTree,
  flattenTree,
  buildTree
} from "@/hooks/core/drag&drop/use-functions";
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
  const [projected, setProjected] = useState<ProjectionReturnType | null>();
  const { activeId, getProjection, overId, setActiveId, setOverId } =
    useProjection();
  const dragAndDrop = useDragAndDrop({ activeId });

  // Revalidate items when edges change
  useEffect(() => {
    if (!edges || !data) return;

    setData(edges);
  }, [edges]);

  const resetState = () => {
    setOverId(null);
    setActiveId(null);
    setProjected(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const flattenedItems = dragAndDrop.flattenedItems({
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
      onDragOver={({ over }) => setOverId(over?.id ?? null)}
      onDragMove={({ delta }) => {
        if (!activeId || !overId) return;

        const currentProjection = getProjection({
          tree: flattenedItems,
          dragOffset: delta.x,
          maxDepth: 0
        });

        if (projected?.parentId === currentProjection.parentId) {
          return;
        }

        setProjected(currentProjection);
      }}
      onDragStart={({ active: { id: activeId } }) => {
        setActiveId(activeId);
        setOverId(activeId);
      }}
      onDragEnd={async ({ active, over }) => {
        resetState();

        if (!projected || !over) return;
        const { depth, parentId } = projected;

        const clonedItems: FlatTree<ShowAdminNavPluginsObj>[] = flattenTree({
          tree: data.map(item => ({
            ...item,
            children: []
          }))
        });

        const toIndex = clonedItems.findIndex(({ id }) => id === over.id);
        const fromIndex = clonedItems.findIndex(({ id }) => id === active.id);
        const sortedItems = arrayMove(clonedItems, fromIndex, toIndex);
        const activeIndex = sortedItems.findIndex(i => i.id === active.id);
        sortedItems[activeIndex] = {
          ...sortedItems[activeIndex],
          depth,
          parentId
        };

        const dataAfterUpdate: FlatTree<ShowAdminNavPluginsObj>[] =
          sortedItems.map(item => ({
            ...item,
            children: []
          }));

        setData(
          buildTree({
            flattenedTree: dataAfterUpdate
          })
        );

        const parents = sortedItems.filter(i => i.parentId === parentId);
        const indexToMove = parents.findIndex(i => i.id === active.id);

        // -1 means that the item is the last one
        const findActive = flattenedItems.find(i => i.id === active.id);
        if (!findActive) return;

        // Do nothing if drag and drop on the same item on the same level
        if (findActive?.parentId === parentId && active.id === over.id) {
          return;
        }

        await mutationChangePositionApi({
          id: Number(active.id),
          indexToMove
        });
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
