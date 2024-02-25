import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { type ShowForumForumsAdmin } from "@/graphql/hooks";
import { mutationUpdateDataApi } from "./mutation-update-data-api";
import { buildTree, flattenTree, type FlatTree } from "../use-functions";

export interface ShowForumForumsAdminWithChildren
  extends Omit<ShowForumForumsAdmin, "children" | "__typename"> {
  children: ShowForumForumsAdminWithChildren[];
}

interface Args {
  initData: ShowForumForumsAdminWithChildren[];
}

export const useForumForumsAdminAPI = ({ initData }: Args) => {
  const t = useTranslations("core");
  const [data, setData] =
    useState<ShowForumForumsAdminWithChildren[]>(initData);

  const updateData = async ({ parentId }: { parentId: number }) => {
    const mutation = await mutationUpdateDataApi({ parentId });

    if (mutation.error || !mutation.data) {
      toast.error(t("errors.title"), {
        description: t("errors.internal_server_error")
      });

      return;
    }

    const data = mutation.data.admin__forum_forums__show.edges;

    setData(prev => {
      const clonedItems: FlatTree<ShowForumForumsAdminWithChildren>[] =
        flattenTree({ tree: prev });
      const items: FlatTree<ShowForumForumsAdminWithChildren>[] = clonedItems
        .map(item => ({ ...item, children: [] }))
        .filter(item => item.parentId !== parentId);
      const parent = items.find(item => item.id === parentId);
      if (!parent) return prev;

      data.forEach(item => {
        items.push({
          ...item,
          parentId,
          depth: parent.depth + 1,
          index: parent.children.length,
          children: (item.children ?? []) as ShowForumForumsAdminWithChildren[]
        });
      });

      return buildTree({ flattenedTree: items });
    });
  };

  return {
    data,
    setData,
    updateData
  };
};
