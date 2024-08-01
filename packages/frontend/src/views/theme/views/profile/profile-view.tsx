import { notFound } from 'next/navigation';

import { fetcher } from '@/graphql/fetcher';
import { AvatarUser } from '@/components/ui/user/avatar';
import { GroupFormat } from '@/components/ui/user/group-format';
import {
  Core_Members__Profiles,
  Core_Members__ProfilesQuery,
  Core_Members__ProfilesQueryVariables,
} from '@/graphql/queries/profiles/core_members__profiles.generated';

const getData = async ({ id }: { id: string }) => {
  const data = await fetcher<
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

export interface ProfileViewProps {
  params: { id: string };
}

export const ProfileView = async ({ params: { id } }: ProfileViewProps) => {
  const {
    core_members__show: { edges },
  } = await getData({ id });
  const data = edges.at(0);
  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="bg-card">
        <div className="container">
          <div className="bg-secondary h-40 rounded-b-md" />
          <div className="-mt-24 flex flex-col items-center gap-2 px-5 pb-5 md:-mt-16 md:flex-row md:items-end md:gap-4">
            <AvatarUser sizeInRem={8} user={data} />

            <div className="flex w-full flex-col gap-4 text-center md:mt-20 md:flex-row md:text-left">
              <div className="flex flex-col items-center gap-1 md:mr-auto md:items-start">
                <h1 className="text-2xl font-semibold">{data.name}</h1>
                <GroupFormat group={data.group} />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
                Something
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">test</div>
    </>
  );
};
