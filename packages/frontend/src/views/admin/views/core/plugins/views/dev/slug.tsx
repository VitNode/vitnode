import { SlugViewProps } from '@/views/slug';
import { notFound } from 'next/navigation';

import { FilesDevPluginAdminView } from './files-view';
import { NavDevPluginAdminView } from './nav/nav';
import { OverviewDevPluginAdminView } from './overview/overview';

export interface SlugDevPluginsAdminProps extends SlugViewProps {
  params: {
    code: string;
  } & SlugViewProps['params'];
}

export const SlugDevPluginsAdminView = (props: SlugDevPluginsAdminProps) => {
  const {
    params: { slug },
  } = props;

  switch (slug[0]) {
    case 'overview':
      return <OverviewDevPluginAdminView {...props} />;
    case 'files':
      return <FilesDevPluginAdminView {...props} />;
    case 'nav':
      return <NavDevPluginAdminView {...props} />;
  }

  notFound();
};
