import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
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
import { ItemDragAndDrop } from "@/hooks/core/drag&drop/item";

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
    actionsItemDragAndDrop,
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
      collisionDetection={closestCorners}
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
          <ItemDragAndDrop
            key={item.id}
            childrenLength={item.children.length}
            {...actionsItemDragAndDrop({
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

        {/* <DragOverlay>
          {activeId !== null && activeItem && (
            <ItemTableForumsForumAdmin
              indentationWidth={indentationWidth}
              overlay
              {...activeItem}
            />
          )}
        </DragOverlay> */}
      </SortableContext>
    </DndContext>
  );
};
