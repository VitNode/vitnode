import { EditActionTableNavDevPluginAdmin } from "./edit";
import { DeleteActionTableNavDevPluginAdmin } from "./delete/delete";
import { FlatTree } from "@/functions/flatten-tree";
import { ShowAdminNavPluginsObj } from "@/utils/graphql/hooks";

export const ActionsTableNavDevPluginAdmin = (
  props: FlatTree<ShowAdminNavPluginsObj>
) => {
  return (
    <div className="flex gap-1">
      <EditActionTableNavDevPluginAdmin {...props} />
      <DeleteActionTableNavDevPluginAdmin {...props} />
    </div>
  );
};
