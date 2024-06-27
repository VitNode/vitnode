import { Metadata } from 'next';
import * as React from 'react';
import { fetcher } from 'vitnode-frontend/graphql/fetcher';
import {
  ProfileView,
  ProfileViewProps,
} from 'vitnode-frontend/theme-tsx/profile/profile-view';

import {
  Core_Members__Profiles,
  Core_Members__ProfilesQuery,
  Core_Members__ProfilesQueryVariables,
} from '@/graphql/hooks';

const getData = async ({ id }: { id: string }) => {
  const { data } = await fetcher<
    Core_Members__ProfilesQuery,
    Core_Members__ProfilesQueryVariables
  >({
    query: Core_Members__Profiles,
    variables: {
      first: 1,
      nameSeo: id,
    },
    cache: 'force-cache',
  });

  return data;
};

interface Props {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const api = await getData({ id });
  const data = api.core_members__show.edges.at(0);
  if (!data) return {};

  return {
    title: data.name,
  };
}

export default async function Page(params: ProfileViewProps) {
  return <ProfileView {...params} />;
}
