import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  LayoutAdminInstallEnum,
  Layout_Admin_Install,
  Layout_Admin_InstallQuery,
  Layout_Admin_InstallQueryVariables
} from '@/graphql/hooks';
import { useRouter } from '@/i18n';

export const useLayoutInstallConfigsAPI = () => {
  const segment = useSelectedLayoutSegment();
  const { replace } = useRouter();

  const current = useQuery({
    queryKey: [APIKeys.LAYOUT_ADMIN_INSTALL],
    queryFn: async () =>
      await fetcher<Layout_Admin_InstallQuery, Layout_Admin_InstallQueryVariables>({
        query: Layout_Admin_Install
      })
  });

  useEffect(() => {
    if (!current.data || segment === 'license' || !segment) {
      return;
    }

    const redirectItems: {
      [key: string]: string;
    } = {
      [LayoutAdminInstallEnum.Account]: '/admin/install/account',
      [LayoutAdminInstallEnum.Database]: '/admin/install/database'
    };

    replace(
      segment ? redirectItems[current.data.layout_admin_install.status] : '/admin/install/database'
    );
  }, [current.data, segment]);

  return current;
};
