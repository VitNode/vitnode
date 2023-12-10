import { cookies } from 'next/headers';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { ProfileView } from '@/themes/default/core/views/profile/profile-view';
import getQueryClient from '@/functions/get-query-client';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Members__Profiles,
  Core_Members__ProfilesQuery,
  Core_Members__ProfilesQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';
import { ErrorView } from '@/themes/default/core/views/global/error/error-view';

const getData = async ({ id }: { id: string }) => {
  return await fetcher<Core_Members__ProfilesQuery, Core_Members__ProfilesQueryVariables>({
    query: Core_Members__Profiles,
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

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const api = await getData({ id });
  const data = api.core_members__show.edges.at(0);
  if (!data) return {};

  return {
    title: data.name
  };
}

export default async function Page({ params: { id } }: Props) {
  const queryClient = getQueryClient();
  const data = await getData({ id });
  await queryClient.setQueryData([APIKeys.PROFILE], data);
  const dehydratedState = dehydrate(queryClient);

  if (data.core_members__show.edges.length <= 0) {
    return <ErrorView className="py-6" code="404" />;
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProfileView />
    </HydrationBoundary>
  );
}
