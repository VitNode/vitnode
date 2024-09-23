import { ShowAdminNavPluginsObj } from '@/graphql/types';

import { DeleteActionTableNavDevPluginAdmin } from './delete/delete';
import { EditActionTableNavDevPluginAdmin } from './edit';

export const ActionsTableNavDevPluginAdmin = (
  props: ShowAdminNavPluginsObj,
) => {
  return (
    <div className="flex gap-1">
      <EditActionTableNavDevPluginAdmin {...props} />
      <DeleteActionTableNavDevPluginAdmin {...props} />
    </div>
  );
};
