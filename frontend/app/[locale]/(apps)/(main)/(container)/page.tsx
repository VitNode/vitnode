import { cookies } from 'next/headers';

import { ForumsForumView } from '@/themes/default/core/views/forum/forums/forums-forum-view';
import { fetcher } from '@/graphql/fetcher';
import {
  Forum_Forums__Show,
  Forum_Forums__ShowQuery,
  Forum_Forums__ShowQueryVariables
} from '@/graphql/hooks';

const getData = async () => {
  return await fetcher<Forum_Forums__ShowQuery, Forum_Forums__ShowQueryVariables>({
    query: Forum_Forums__Show,

    headers: {
      Cookie: cookies().toString()
    }
  });
};

export default async function Page() {
  const data = await getData();

  return <ForumsForumView {...data} />;
}
