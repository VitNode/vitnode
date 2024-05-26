import { ShowAdminNavPluginsObj } from "@/graphql/hooks";
import { EditActionTableNavDevPluginAdmin } from "./edit";
import { DeleteActionTableNavDevPluginAdmin } from "./delete/delete";

export const ActionsTableNavDevPluginAdmin = (
  props: ShowAdminNavPluginsObj
) => {
  return (
    <div className="flex gap-1">
      <EditActionTableNavDevPluginAdmin {...props} />
      <DeleteActionTableNavDevPluginAdmin {...props} />
    </div>
  );
};
