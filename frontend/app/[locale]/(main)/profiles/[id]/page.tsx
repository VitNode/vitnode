import { cookies } from 'next/headers';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { ProfileView } from '@/themes/default/core/views/profile/profile-view';
import getQueryClient from '@/functions/get-query-client';
import { fetcher } from '@/graphql/fetcher';
import {
  Profiles_Core_Members,
  Profiles_Core_MembersQuery,
  Profiles_Core_MembersQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

const getData = async ({ id }: { id: string }) => {
  return await fetcher<Profiles_Core_MembersQuery, Profiles_Core_MembersQueryVariables>({
    query: Profiles_Core_Members,
    variables: {
      first: 1,
      findByIds: [id]
    },
    headers: {
      Cookie: cookies().toString()
    }
  });
};

interface Props {
  params: { id: string };
}

export default async function Page({ params: { id } }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [APIKeys.PROFILE, { id }],
    queryFn: () => getData({ id })
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProfileView />
    </HydrationBoundary>
  );
}
