import { notFound } from 'next/navigation';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Members__Profiles,
  Core_Members__ProfilesQuery,
  Core_Members__ProfilesQueryVariables,
} from '@/graphql/graphql';
import { getTextLang } from '@/hooks/use-text-lang';
import { AvatarUser } from '@/components/ui/user/avatar';
import { Button } from '@/components/ui/button';

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
  params: { id: string; locale: string };
}

export const ProfileView = async ({
  params: { id, locale },
}: ProfileViewProps) => {
  const { convertText } = getTextLang({ locale });

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
                <span>{convertText(data.group.name)}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
                <Button>Test 123</Button>
                <Button>Test 123</Button>
                <Button>Test 123</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">test</div>
    </>
  );
};
