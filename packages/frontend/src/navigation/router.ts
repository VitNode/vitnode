'use client';

import { useSearchParams } from 'next/navigation';
import { createNavigation } from 'next-intl/navigation';
import NProgress from 'nprogress';
import React from 'react';

const { useRouter: useRouterI18n, usePathname } = createNavigation();

const useRouter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouterI18n();
  const { push } = router;

  router.push = (href, options) => {
    NProgress.start();
    push(href, options);
  };

  React.useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return router;
};

export { usePathname, useRouter };
