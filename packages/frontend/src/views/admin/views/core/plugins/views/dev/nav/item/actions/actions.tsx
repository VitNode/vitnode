import { EditActionTableNavDevPluginAdmin } from './edit';
import { DeleteActionTableNavDevPluginAdmin } from './delete/delete';
import { ShowAdminNavPluginsObj } from '@/graphql/graphql';
import { FlatTree } from '@/helpers/flatten-tree';

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
