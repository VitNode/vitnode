import { getAdminAiSettings } from '../query';
import { ContentProvidersAiAdmin } from './content';

export const ProvidersAiAdminView = async () => {
  const data = await getAdminAiSettings();

  return <ContentProvidersAiAdmin {...data} />;
};
