import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProfileView } from '@/themes/default/core/views/profile/profile-view';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Members__Profiles,
  type Core_Members__ProfilesQuery,
  type Core_Members__ProfilesQueryVariables
} from '@/graphql/hooks';

const getData = async ({ id }: { id: string }) => {
  const { data } = await fetcher<Core_Members__ProfilesQuery, Core_Members__ProfilesQueryVariables>(
    {
      query: Core_Members__Profiles,
      variables: {
        first: 1,
        findByIds: [id]
      },
      headers: {
        Cookie: cookies().toString()
      }
    }
  );

  return data;
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
  const data = await getData({ id });

  if (data.core_members__show.edges.length === 0) {
    notFound();
  }

  return <ProfileView data={data} />;
}
