import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
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
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { ItemContentTableContentNavAdmin } from "./item";
import type { Admin__Core_Nav__ShowQuery, ShowCoreNav } from "@/graphql/hooks";
import { mutationChangePositionApi } from "./hooks/mutation-change-position-api";
import { useDragAndDrop } from "@/hooks/core/drag&drop/use-functions";

const indentationWidth = 20;

export const ContentTableContentNavAdmin = ({
  core_nav__show: { edges }
}: Admin__Core_Nav__ShowQuery) => {
  const t = useTranslations("core");
  const [data, setData] = useState<Omit<ShowCoreNav, "__typename">[]>(edges);

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
    data: data.map(item => ({
      ...item,
      children: item.children.map(child => ({ ...child, children: [] }))
    }))
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
          <ItemContentTableContentNavAdmin
            key={item.id}
            indentationWidth={indentationWidth}
            onCollapse={id => {
              const isOpen = isOpenChildren.includes(id);

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
            <ItemContentTableContentNavAdmin
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
