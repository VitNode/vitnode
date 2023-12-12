import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { fetcher } from '@/graphql/fetcher';
import {
  Forum_Forums__Show_Item,
  Forum_Forums__Show_ItemQuery,
  Forum_Forums__Show_ItemQueryVariables
} from '@/graphql/hooks';

export const useItemShowForumsAPI = () => {
  const { forum_name_seo } = useParams();

  const query = useQuery({
    queryKey: ['item-show-forums', { name_seo: forum_name_seo }],
    queryFn: async () =>
      await fetcher<Forum_Forums__Show_ItemQuery, Forum_Forums__Show_ItemQueryVariables>({
        query: Forum_Forums__Show_Item,
        variables: {
          nameSeo: Array.isArray(forum_name_seo) ? forum_name_seo.at(0) : forum_name_seo
        }
      }),
    placeholderData: previousData => previousData
  });

  const data = useMemo(() => {
    const current = query.data?.forum_forums__show.edges.at(0);

    return current ? current : null;
  }, [query.data]);

  return { ...query, data };
};
