import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { TopicView } from '@/themes/default/core/views/forum/topic/topic-view';
import { fetcher, type ErrorType } from '@/graphql/fetcher';
import {
  Forum_Topics__Show,
  ShowPostsForumsSortingEnum,
  type Forum_Topics__ShowQuery,
  type Forum_Topics__ShowQueryVariables
} from '@/graphql/hooks';
import { getIdFormString } from '@/functions/url';
import { ErrorView } from '@/themes/default/core/views/global/error/error-view';

const firstEdges = 25;

const getData = async ({ id, sort }: { id: string; sort: string | undefined }) => {
  let sortBy: ShowPostsForumsSortingEnum | undefined;
  if (sort === ShowPostsForumsSortingEnum.newest) {
    sortBy = ShowPostsForumsSortingEnum.newest;
  } else {
    sortBy = ShowPostsForumsSortingEnum.oldest;
  }

  const { data } = await fetcher<Forum_Topics__ShowQuery, Forum_Topics__ShowQueryVariables>({
    query: Forum_Topics__Show,
    variables: {
      id: getIdFormString(id),
      sortBy,
      firstEdges
    },
    headers: {
      Cookie: cookies().toString()
    }
  });

  return data;
};

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    sort?: string;
  };
}

export default async function Page({ params: { id }, searchParams: { sort } }: Props) {
  let data: Forum_Topics__ShowQuery | undefined;
  try {
    data = await getData({ id, sort });
  } catch (e) {
    const error = e as ErrorType;

    if (error.extensions?.code === 'ACCESS_DENIED') {
      return <ErrorView code="403" />;
    }

    throw e;
  }

  if (!data || data.forum_topics__show.edges.length === 0) {
    notFound();
  }

  return <TopicView data={data} firstEdges={firstEdges} />;
}
