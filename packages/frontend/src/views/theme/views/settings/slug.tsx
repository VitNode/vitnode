import { notFound } from 'next/navigation';

import { SlugViewProps } from '@/views/slug';
import { OverviewSettingsView } from './views/overview/overview-settings-view';
import { DevicesSettingsView } from './views/devices/devices-settings-view';
import { FilesSettingsView } from './views/files/files-settings-view';

export const SlugSettingsView = (props: SlugViewProps) => {
  const {
    params: { slug },
  } = props;

  switch (slug[0]) {
    case 'overview':
      return <OverviewSettingsView />;
    case 'devices':
      return <DevicesSettingsView />;
    case 'files':
      return <FilesSettingsView {...props} />;
  }

  notFound();
};
