import { Virtuoso } from "react-virtuoso";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MeasuringStrategy
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
import { Loader } from "@/components/loader";
import { ErrorAdminView } from "@/admin/core/global/error-admin-view";
import { mutationChangePositionApi } from "./hooks/mutation-change-position-api";
import { useDragAndDrop, type FlatTree } from "./use-functions";
import { useProjection, type ProjectionReturnType } from "./use-projection";

const indentationWidth = 20;

export const ContentTableForumsForumAdmin = () => {
  const t = useTranslations("core");
  const {
    data: initData,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading
  } = useForumForumsAdminAPI();
  const [data, setData] =
    useState<ShowForumForumsAdminWithChildren[]>(initData);
  const [projected, setProjected] = useState<ProjectionReturnType | null>();

  const { activeId, getProjection, overId, setActiveId, setOverId } =
    useProjection();
  const testDragAndDrop = useDragAndDrop({ activeId });

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

  const flattenedItems = testDragAndDrop.flattenedItems({ data });
  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems]
  );

  if (isLoading) return <Loader />;
  if (isError) return <ErrorAdminView />;
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
          testDragAndDrop.flattenTree({ tree: data });
        const toIndex = clonedItems.findIndex(({ id }) => id === over.id);
        const fromIndex = clonedItems.findIndex(({ id }) => id === active.id);
        const sortedItems = arrayMove(clonedItems, fromIndex, toIndex);
        const build = testDragAndDrop.buildTree({
          flattenedTree: sortedItems
        });

        setData(build);

        // -1 means that the item is the last one
        const findActive = flattenedItems.find(i => i.id === active.id);
        if (!findActive) return;

        // If change item position on the same level at the end of the list
        if (active.id === over.id && depth < findActive.depth) {
          const findParentPosition = flattenedItems.find(
            i => i.id === findActive.parentId
          )?.position;

          if (findParentPosition === undefined) return;

          await mutationChangePositionApi({
            id: Number(active.id),
            parentId,
            indexToMove: findParentPosition + 1
          });

          return;
        }

        const indexToMove =
          active.id === over.id
            ? -1
            : flattenedItems.find(i => i.id === over.id)?.position ?? -1;

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
        <Virtuoso
          useWindowScroll
          data={flattenedItems}
          overscan={200}
          className="rounded-md"
          endReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          itemContent={(_index, item) => {
            return (
              <ItemTableForumsForumAdmin
                key={item.id}
                indentationWidth={indentationWidth}
                onCollapse={id => {
                  testDragAndDrop.setIsOpenChildren(prev => {
                    if (prev.includes(id)) {
                      return prev.filter(i => i !== id);
                    }

                    return [...prev, id];
                  });
                }}
                isOpenChildren={testDragAndDrop.isOpenChildren.includes(
                  item.id
                )}
                isDropHere={projected?.parentId === item.id}
                {...item}
              />
            );
          }}
        />
      </SortableContext>
    </DndContext>
  );
};
