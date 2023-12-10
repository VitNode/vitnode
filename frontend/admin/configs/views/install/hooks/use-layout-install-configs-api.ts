import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  LayoutAdminInstallEnum,
  Admin_Install__Layout,
  Admin_Install__LayoutQuery,
  Admin_Install__LayoutQueryVariables
} from '@/graphql/hooks';
import { useRouter } from '@/i18n';

export const useLayoutInstallConfigsAPI = () => {
  const segment = useSelectedLayoutSegment();
  const { replace } = useRouter();

  const current = useQuery({
    queryKey: [APIKeys.LAYOUT_ADMIN_INSTALL],
    queryFn: async () =>
      await fetcher<Admin_Install__LayoutQuery, Admin_Install__LayoutQueryVariables>({
        query: Admin_Install__Layout
      })
  });

  useEffect(() => {
    if (!current.data || segment === 'license' || !segment) {
      return;
    }

    const redirectItems: {
      [key: string]: string;
    } = {
      [LayoutAdminInstallEnum.account]: '/admin/install/account',
      [LayoutAdminInstallEnum.database]: '/admin/install/database'
    };

    const path = redirectItems[current.data.admin_install__layout.status];

    replace(segment && path ? path : '/admin/install/database');
  }, [segment]);

  return current;
};
