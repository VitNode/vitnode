import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { UsersMembersAdminView } from '@/admin/views/members/users/users-members-admin-view';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Members__Admin__Show,
  Core_Members__Admin__ShowQuery,
  Core_Members__Admin__ShowQueryVariables
} from '@/graphql/hooks';
import getQueryClient from '@/functions/get-query-client';
import { APIKeys } from '@/graphql/api-keys';
import { emptyPagination } from '@/hooks/core/utils/use-pagination-api';

interface Props {
  params: {
    locale: string;
  };
}

const getData = async () => {
  return await fetcher<Core_Members__Admin__ShowQuery, Core_Members__Admin__ShowQueryVariables>({
    query: Core_Members__Admin__Show,
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
    queryKey: [APIKeys.USERS_MEMBERS, { ...emptyPagination, groups: [] }],
    queryFn: getData
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UsersMembersAdminView />
    </HydrationBoundary>
  );
}
