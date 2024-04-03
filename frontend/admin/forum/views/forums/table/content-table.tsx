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
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { ItemTableForumsForumAdmin } from "./item/item";
import {
  useForumForumsAdminAPI,
  type ShowForumForumsAdminWithChildren
} from "./hooks/use-forum-forums-admin-api";
import { mutationChangePositionApi } from "./hooks/mutation-change-position-api";
import { useDragAndDrop } from "@/hooks/core/drag&drop/use-functions";

const indentationWidth = 20;

export interface TableForumsForumAdminProps {
  initData: ShowForumForumsAdminWithChildren[];
}

export const ContentTableForumsForumAdmin = ({
  initData
}: TableForumsForumAdminProps) => {
  const t = useTranslations("core");
  const { data, setData, updateData } = useForumForumsAdminAPI({ initData });
  const {
    activeId,
    flattItems,
    isOpenChildren,
    onDragEnd,
    onDragMove,
    onDragOver,
    onDragStart,
    projected,
    resetState,
    setIsOpenChildren
  } = useDragAndDrop();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const flattenedItems = flattItems({ data });
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

        await mutationChangePositionApi(moveTo);
      }}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(item => (
          <ItemTableForumsForumAdmin
            key={item.id}
            indentationWidth={indentationWidth}
            onCollapse={id => {
              const isOpen = isOpenChildren.includes(id);

              if (!isOpen) {
                updateData({ parentId: Number(id) });
              }

              setIsOpenChildren(prev => {
                if (isOpen) {
                  return prev.filter(i => i !== id);
                }

                return [...prev, id];
              });
            }}
            isOpenChildren={isOpenChildren.includes(item.id)}
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
              overlay
              {...activeItem}
            />
          )}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
