import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect';

import { ForumForumView } from '@/themes/default/core/views/forum/forums/views/[id]/forum-forum-view';
import { fetcher, type ErrorType } from '@/graphql/fetcher';
import { Forum_Forums__Show_Item } from '@/graphql/hooks';
import type {
  Forum_Forums__Show_ItemQuery,
  Forum_Forums__Show_ItemQueryVariables
} from '@/graphql/hooks';
import { getIdFormString } from '@/functions/url';
import { ErrorView } from '@/themes/default/core/views/global/error/error-view';

const getData = async ({ id }: { id: string }) => {
  const { data } = await fetcher<
    Forum_Forums__Show_ItemQuery,
    Forum_Forums__Show_ItemQueryVariables
  >({
    query: Forum_Forums__Show_Item,
    variables: {
      forumId: getIdFormString(id)
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
}

export default async function Page({ params: { id } }: Props) {
  try {
    const data = await getData({ id });

    if (data.forum_forums__show.edges.length === 0) {
      notFound();
    }

    return <ForumForumView data={data} />;
  } catch (e) {
    if (isRedirectError(e)) {
      notFound();
    }

    const error = e as ErrorType;

    if (error.extensions.code === 'ACCESS_DENIED') {
      return <ErrorView code="403" />;
    }

    throw error;
  }
}
