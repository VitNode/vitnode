'use client';

import { ReactNode, useEffect } from 'react';

import { Admin_Install__LayoutQuery, LayoutAdminInstallEnum } from '@/graphql/hooks';
import { usePathname, useRouter } from '@/i18n';

interface Props {
  children: ReactNode;
  data: Admin_Install__LayoutQuery;
}

export const RedirectsInstallConfigsLayout = ({ children, data }: Props) => {
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const redirectItems: {
      [key: string]: string;
    } = {
      [LayoutAdminInstallEnum.database]: '/admin/install',
      [LayoutAdminInstallEnum.account]: '/admin/install/account'
    };

    const path = redirectItems[data.admin_install__layout.status];

    if (path !== pathname) {
      replace(path);
    }
  }, [data]);

  return children;
};
