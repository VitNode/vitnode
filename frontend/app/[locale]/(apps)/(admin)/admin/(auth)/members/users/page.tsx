import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { UsersMembersAdminView } from '@/admin/views/members/users/users-members-admin-view';
import { fetcher } from '@/graphql/fetcher';
import {
  Show_Admin_Members,
  Show_Admin_MembersQuery,
  Show_Admin_MembersQueryVariables
} from '@/graphql/hooks';
import getQueryClient from '@/functions/get-query-client';
import { APIKeys } from '@/graphql/api-keys';

interface Props {
  params: {
    locale: string;
  };
}

const getData = async () => {
  return await fetcher<Show_Admin_MembersQuery, Show_Admin_MembersQueryVariables>({
    query: Show_Admin_Members,
    variables: {
      first: 10
    },
    headers: {
      Cookie: cookies().toString()
    }
  });
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'admin.members.users' });

  return {
    title: t('title')
  };
}

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [
      APIKeys.USERS_MEMBERS,
      { cursor: null, first: 0, last: null, search: '', groups: [], sortBy: null }
    ],
    queryFn: getData
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UsersMembersAdminView />
    </HydrationBoundary>
  );
}
