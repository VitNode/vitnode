import { SlugViewProps } from '@/views/slug';
import { notFound } from 'next/navigation';

import { NavDevPluginAdminView } from './nav/nav';
import { OverviewDevPluginAdminView } from './overview';

export interface SlugDevPluginsAdminProps extends SlugViewProps {
  params: {
    code: string;
  } & SlugViewProps['params'];
}

export const SlugDevPluginsAdminView = (props: SlugDevPluginsAdminProps) => {
  const {
    params: { slug },
  } = props;

  if (!slug[1]) {
    if (slug[0] === 'overview')
      return <OverviewDevPluginAdminView {...props} />;
    if (slug[0] === 'nav') return <NavDevPluginAdminView {...props} />;
  }

  notFound();
};
