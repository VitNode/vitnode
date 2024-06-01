"use client";

import { Virtuoso } from "react-virtuoso";

import { Forum_Forums__Show_ItemQuery } from "@/utils/graphql/hooks";
import { ItemTopicListForum } from "./item";
import { useTopicsList } from "@/plugins/forum/hooks/forum/use-topics-list";
import { Loader } from "@/components/loader";

interface Props {
  initData: Forum_Forums__Show_ItemQuery["forum_topics__show"];
}

export const TopicsListForum = ({ initData }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useTopicsList({
    initData
  });

  return (
    <Virtuoso
      data={data}
      useWindowScroll
      endReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      components={{
        Footer: () => {
          if (!isFetching) return null;

          return <Loader className="mt-4" />;
        }
      }}
      itemContent={(index, data) => <ItemTopicListForum {...data} />}
    />
  );
};
