"use client";

import {
  DndContext,
  closestCorners,
  DragOverlay,
  MeasuringStrategy,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";

import { ItemTableForumsForumAdmin } from "./item/item";
import {
  useForumForumsAdminAPI,
  ShowForumForumsAdminWithChildren
} from "./hooks/use-forum-forums-admin-api";
import { mutationChangePositionApi } from "./hooks/mutation-change-position-api";
import { useDragAndDrop } from "@/plugins/core/hooks/drag&drop/use-functions";
import { ItemDragAndDrop } from "@/plugins/core/hooks/drag&drop/item";
import { Admin__Forum_Forums__ShowQuery } from "@/utils/graphql/hooks";

const indentationWidth = 20;

export interface TableForumsForumAdminProps {
  initData: ShowForumForumsAdminWithChildren[];
}

export const TableForumsForumAdmin = ({
  admin__forum_forums__show: { edges }
}: Admin__Forum_Forums__ShowQuery) => {
  const initData: ShowForumForumsAdminWithChildren[] = edges.map(item => ({
    ...item,
    children:
      item.children.length > 0
        ? (item.children as unknown as ShowForumForumsAdminWithChildren[]) // Convert to the correct type, drizzle don't support recursive types
        : []
  }));
  const t = useTranslations("core");
  const { data, setData, updateData } = useForumForumsAdminAPI({ initData });
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
  } = useDragAndDrop<ShowForumForumsAdminWithChildren>({ data });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  if (!data || data.length === 0) {
    return <div className="text-center">{t("no_results")}</div>;
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always
        }
      }}
      onDragCancel={resetState}
      onDragOver={onDragOver}
      onDragMove={e => onDragMove({ ...e, flattenedItems, indentationWidth })}
      onDragStart={onDragStart}
      onDragEnd={async ({ active, over, ...rest }) => {
        const moveTo = onDragEnd<ShowForumForumsAdminWithChildren>({
          active,
          over,
          data,
          setData,
          ...rest
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
              onCollapse: ({ isOpen }) => {
                if (!isOpen) {
                  updateData({ parentId: item.id });
                }
              },
              indentationWidth
            })}
          >
            <ItemTableForumsForumAdmin data={item} />
          </ItemDragAndDrop>
        ))}

        <DragOverlay>
          {activeItemOverlay && (
            <ItemDragAndDrop
              {...actionsItem({
                data: activeItemOverlay
              })}
            >
              <ItemTableForumsForumAdmin data={activeItemOverlay} />
            </ItemDragAndDrop>
          )}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
