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

    // setData(prev => {
    //   const clonedItems: FlatTree<ShowForumForumsAdminWithChildren>[] =
    //     flattenTree({ tree: prev });

    //   const parentIndex1 = clonedItems.findIndex(i => i.id === parentId);
    //   const parent1 = clonedItems[parentIndex1];

    //   clonedItems[parentIndex1] = {
    //     ...parent1,
    //     children: data
    //   };

    //   const build1 = buildTree({ flattenedTree: clonedItems });

    //   const test = clonedItems.filter(item => !item.parentId);

    //   const items = clonedItems.filter(item => item.parentId !== parentId);

    //   const parentIndex = items.findIndex(i => i.id === parentId);
    //   const parent = items[parentIndex];

    //   items[parentIndex] = {
    //     ...parent,
    //     children: mutation.data.admin__forum_forums__show.edges
    //   };

    //   const build = buildTree({ flattenedTree: items });

    //   return build;
    // });
  };

  return {
    data,
    setData,
    updateData
  };
};
