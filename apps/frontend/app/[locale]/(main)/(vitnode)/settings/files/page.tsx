import React from 'react';
import {
  FilesSettingsView,
  FilesSettingsViewProps,
  generateMetadataFilesSettings,
} from 'vitnode-frontend/views/theme/views/settings/views/files/files-settings-view';

export const generateMetadata = generateMetadataFilesSettings;

export default function Page(props: FilesSettingsViewProps) {
  return <FilesSettingsView {...props} />;
}
