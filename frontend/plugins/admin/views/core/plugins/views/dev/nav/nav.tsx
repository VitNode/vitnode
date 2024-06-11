"use client";

import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useParams } from "next/navigation";
import { WithChildren } from "@vitnode/frontend/helpers";

import { useDragAndDrop } from "@/plugins/core/hooks/drag&drop/use-functions";
import {
  Admin__Core_Plugins__Nav__ShowQuery,
  ShowAdminNavPluginsObj
} from "@/graphql/hooks";
import { ItemContentNavDevPluginAdmin } from "./item";
import { mutationChangePositionApi } from "./item/hooks/mutation-change-position-api";
import { ItemDragAndDrop } from "@/plugins/core/hooks/drag&drop/item";
import { ItemNavDevPluginAdminContext } from "./item/hooks/use-item-nav-dev-plugin-admin";

interface Props extends Admin__Core_Plugins__Nav__ShowQuery {
  icons: { icon: React.ReactNode; id: string }[];
}

export const NavDevPluginAdminView = ({
  admin__core_plugins__nav__show: edges,
  icons
}: Props) => {
  const t = useTranslations("core");
  const { code } = useParams();
  const [initData, setData] = React.useState<ShowAdminNavPluginsObj[]>(edges);
  const data: WithChildren<ShowAdminNavPluginsObj>[] = initData.map(item => ({
    ...item,
    children:
      item.children?.map(child => ({
        ...child,
        id: child.code,
        children: []
      })) ?? [],
    id: item.code
  }));

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
  } = useDragAndDrop<ShowAdminNavPluginsObj>({
    data
  });

  // Revalidate items when edges change
  React.useEffect(() => {
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
      onDragMove={e => onDragMove({ ...e, flattenedItems, maxDepth: 1 })}
      onDragStart={onDragStart}
      onDragEnd={async event => {
        const moveTo = onDragEnd<ShowAdminNavPluginsObj>({
          data,
          setData,
          ...event
        });

        if (!moveTo) return;

        await mutationChangePositionApi({
          code: moveTo.id.toString(),
          pluginCode: Array.isArray(code) ? code[0] : code,
          indexToMove: moveTo.indexToMove,
          parentCode: moveTo.parentId?.toString()
        });
      }}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(item => (
          <ItemDragAndDrop
            key={item.id}
            {...actionsItem({
              data: item,
              indentationWidth: 20
            })}
          >
            <ItemNavDevPluginAdminContext.Provider
              value={{
                dataFromSSR: edges,
                parentId: item.parentId?.toString(),
                icons
              }}
            >
              <ItemContentNavDevPluginAdmin {...item} />
            </ItemNavDevPluginAdminContext.Provider>
          </ItemDragAndDrop>
        ))}

        <DragOverlay>
          {activeItemOverlay && (
            <ItemDragAndDrop
              {...actionsItem({
                data: activeItemOverlay
              })}
            >
              <ItemNavDevPluginAdminContext.Provider
                value={{
                  dataFromSSR: edges,
                  icons
                }}
              >
                <ItemContentNavDevPluginAdmin {...activeItemOverlay} />
              </ItemNavDevPluginAdminContext.Provider>
            </ItemDragAndDrop>
          )}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
