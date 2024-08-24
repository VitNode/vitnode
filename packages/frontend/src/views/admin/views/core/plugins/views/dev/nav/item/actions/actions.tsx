import { ShowAdminNavPluginsObj } from '@/graphql/types';
import { FlatTree } from '@/helpers/flatten-tree';

import { DeleteActionTableNavDevPluginAdmin } from './delete/delete';
import { EditActionTableNavDevPluginAdmin } from './edit';

export const ActionsTableNavDevPluginAdmin = (
  props: FlatTree<ShowAdminNavPluginsObj>,
) => {
  return (
    <div className="flex gap-1">
      <EditActionTableNavDevPluginAdmin {...props} />
      <DeleteActionTableNavDevPluginAdmin {...props} />
    </div>
  );
};
