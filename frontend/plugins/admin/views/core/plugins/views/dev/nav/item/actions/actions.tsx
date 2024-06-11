import { FlatTree } from "@vitnode/frontend/helpers";

import { EditActionTableNavDevPluginAdmin } from "./edit";
import { DeleteActionTableNavDevPluginAdmin } from "./delete/delete";
import { ShowAdminNavPluginsObj } from "@/graphql/hooks";

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
