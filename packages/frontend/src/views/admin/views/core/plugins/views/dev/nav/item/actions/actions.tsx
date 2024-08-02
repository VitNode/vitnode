import { EditActionTableNavDevPluginAdmin } from './edit';
import { DeleteActionTableNavDevPluginAdmin } from './delete/delete';
import { FlatTree } from '@/helpers/flatten-tree';
import { ShowAdminNavPluginsObj } from '@/graphql/types';

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
