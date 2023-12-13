import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { fetcher } from '@/graphql/fetcher';
import {
  Forum_Forums__Show_Item,
  Forum_Forums__Show_ItemQuery,
  Forum_Forums__Show_ItemQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

export const useItemShowForumsAPI = () => {
  const { id } = useParams();

  const query = useQuery({
    queryKey: [APIKeys.FORUMS_ITEM, { id }],
    queryFn: async () =>
      await fetcher<Forum_Forums__Show_ItemQuery, Forum_Forums__Show_ItemQueryVariables>({
        query: Forum_Forums__Show_Item
      }),
    placeholderData: previousData => previousData
  });

  const data = useMemo(() => {
    const current = query.data?.forum_forums__show.edges.at(0);

    return current ? current : null;
  }, [query.data]);

  return { ...query, data };
};
