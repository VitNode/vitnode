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
  if (!slug[1]) {
    if (slug[0] === 'overview') return {};
    if (slug[0] === 'devices') return generateMetadataDevicesSettings();
    if (slug[0] === 'files') return generateMetadataFilesSettings();
  }

  return {};
};

export const SlugSettingsView = (props: SlugViewProps) => {
  const {
    params: { slug },
  } = props;

  if (!slug[1]) {
    if (slug[0] === 'overview') return <OverviewSettingsView />;
    if (slug[0] === 'devices') return <DevicesSettingsView />;
    if (slug[0] === 'files') return <FilesSettingsView {...props} />;
  }

  notFound();
};
