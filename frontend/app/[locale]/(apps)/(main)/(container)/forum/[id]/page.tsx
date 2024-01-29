import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { ForumForumView } from '@/themes/1/forum/views/forum/forums/views/[id]/forum-forum-view';
import { fetcher, type ErrorType } from '@/graphql/fetcher';
import { Forum_Forums__Show_Item } from '@/graphql/hooks';
import type {
  Forum_Forums__Show_ItemQuery,
  Forum_Forums__Show_ItemQueryVariables
} from '@/graphql/hooks';
import { getIdFormString } from '@/functions/url';
import { ErrorView } from '@/themes/1/core/views/global/error/error-view';

const getData = async ({ id }: { id: string }) => {
  const { data } = await fetcher<
    Forum_Forums__Show_ItemQuery,
    Forum_Forums__Show_ItemQueryVariables
  >({
    query: Forum_Forums__Show_Item,
    variables: {
      forumId: getIdFormString(id),
      first: 25
    },
    headers: {
      Cookie: cookies().toString()
    },
    cache: 'force-cache'
  });

  return data;
};

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id } }: Props) {
  let data: Forum_Forums__Show_ItemQuery | undefined;
  try {
    data = await getData({ id });
  } catch (e) {
    const error = e as ErrorType;

    if (error.extensions?.code === 'ACCESS_DENIED') {
      return <ErrorView code="403" />;
    }

    throw e;
  }

  if (!data || data.forum_forums__show.edges.length === 0) {
    notFound();
  }

  return <ForumForumView data={data} />;
}
