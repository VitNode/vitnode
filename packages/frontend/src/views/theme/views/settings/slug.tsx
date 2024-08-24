import { SlugViewProps } from '@/views/slug';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  DevicesSettingsView,
  generateMetadataDevicesSettings,
} from './views/devices/devices-settings-view';
import {
  FilesSettingsView,
  generateMetadataFilesSettings,
} from './views/files/files-settings-view';
import { OverviewSettingsView } from './views/overview/overview-settings-view';

export const generateMetadataSlugSettings = async ({
  params: { slug },
}: SlugViewProps): Promise<Metadata> => {
  switch (slug[0]) {
    case 'overview':
      return {};
    case 'devices':
      return generateMetadataDevicesSettings();
    case 'files':
      return generateMetadataFilesSettings();
  }

  return {};
};

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
