import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
  DragOverlay
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { ItemTableForumsForumAdmin } from "./item/item";
import {
  useForumForumsAdminAPI,
  type ShowForumForumsAdminWithChildren
} from "./hooks/use-forum-forums-admin-api";
import { mutationChangePositionApi } from "./hooks/mutation-change-position-api";
import {
  useDragAndDrop,
  type FlatTree,
  buildTree,
  flattenTree
} from "./use-functions";
import { useProjection, type ProjectionReturnType } from "./use-projection";

const indentationWidth = 20;

export interface TableForumsForumAdminProps {
  initData: ShowForumForumsAdminWithChildren[];
}

export const ContentTableForumsForumAdmin = ({
  initData
}: TableForumsForumAdminProps) => {
  const t = useTranslations("core");
  const { data, setData, updateData } = useForumForumsAdminAPI({ initData });
  const [projected, setProjected] = useState<ProjectionReturnType | null>();
  const { activeId, getProjection, overId, setActiveId, setOverId } =
    useProjection();
  const dragAndDrop = useDragAndDrop({ activeId });

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

  const flattenedItems = dragAndDrop.flattenedItems({ data });
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
          indentationWidth
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

        const clonedItems: FlatTree<ShowForumForumsAdminWithChildren>[] =
          flattenTree({ tree: data });

        const toIndex = clonedItems.findIndex(({ id }) => id === over.id);
        const fromIndex = clonedItems.findIndex(({ id }) => id === active.id);
        const sortedItems = arrayMove(clonedItems, fromIndex, toIndex);
        const activeIndex = sortedItems.findIndex(i => i.id === active.id);
        sortedItems[activeIndex] = {
          ...sortedItems[activeIndex],
          depth,
          parentId
        };

        const dataAfterUpdate: FlatTree<
          FlatTree<ShowForumForumsAdminWithChildren>
        >[] = sortedItems.map(item => ({
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
          parentId,
          indexToMove
        });
      }}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(item => (
          <ItemTableForumsForumAdmin
            key={item.id}
            indentationWidth={indentationWidth}
            onCollapse={id => {
              const isOpen = dragAndDrop.isOpenChildren.includes(id);

              if (!isOpen) {
                updateData({ parentId: Number(id) });
              }

              dragAndDrop.setIsOpenChildren(prev => {
                if (isOpen) {
                  return prev.filter(i => i !== id);
                }

                return [...prev, id];
              });
            }}
            isOpenChildren={dragAndDrop.isOpenChildren.includes(item.id)}
            isDropHere={projected?.parentId === item.id}
            active={activeId === item.id}
            {...item}
            depth={
              activeId === item.id && projected?.parentId
                ? projected?.depth
                : item.depth
            }
          />
        ))}

        <DragOverlay>
          {activeId !== null && activeItem && (
            <ItemTableForumsForumAdmin
              indentationWidth={indentationWidth}
              isOpenChildren={false}
              isDropHere={false}
              {...activeItem}
            />
          )}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
