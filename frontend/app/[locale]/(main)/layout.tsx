import { ReactNode, lazy } from 'react';

import { CONFIG } from '@/config';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default function Layout({ children }: Props) {
  const Layout = lazy(() =>
    import(`@/themes/${CONFIG.default_theme}/core/layout/layout`).then(module => ({
      default: module.Layout
    }))
  );

  return <Layout>{children}</Layout>;
}
