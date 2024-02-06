import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { lazy, type LazyExoticComponent } from 'react';

import { type TopicViewProps } from '@/themes/1/forum/views/forum/topic/topic-view';
import { fetcher, type ErrorType } from '@/graphql/fetcher';
import {
  Forum_Topics__Show,
  ShowPostsForumsSortingEnum,
  type Forum_Topics__ShowQuery,
  type Forum_Topics__ShowQueryVariables
} from '@/graphql/hooks';
import { getIdFormString } from '@/functions/url';
import { type ErrorViewProps } from '@/themes/1/core/views/global/error/error-view';
import { getSessionData } from '@/functions/get-session-data';

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
    },
    cache: 'force-cache',
    next: {
      tags: ['Forum_Topics__Show']
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
  const { theme_id } = await getSessionData();
  let data: Forum_Topics__ShowQuery | undefined;
  try {
    data = await getData({ id, sort });
  } catch (e) {
    const error = e as ErrorType;

    if (error.extensions?.code === 'ACCESS_DENIED') {
      const ErrorView: LazyExoticComponent<(props: ErrorViewProps) => JSX.Element> = lazy(() =>
        import(`@/themes/${theme_id}/core/views/global/error/error-view`).catch(
          () => import('@/themes/1/core/views/global/error/error-view')
        )
      );

      return <ErrorView code="403" />;
    }

    throw e;
  }

  if (!data || data.forum_topics__show.edges.length === 0) {
    notFound();
  }

  const PageFromTheme: LazyExoticComponent<(props: TopicViewProps) => JSX.Element> = lazy(() =>
    import(`@/themes/${theme_id}/forum/views/forum/topic/topic-view`).catch(
      () => import('@/themes/1/forum/views/forum/topic/topic-view')
    )
  );

  return <PageFromTheme data={data} firstEdges={firstEdges} />;
}
