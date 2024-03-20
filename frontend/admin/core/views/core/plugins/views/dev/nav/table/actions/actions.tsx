import type { ShowAdminNavPluginsObj } from "@/graphql/hooks";
import { EditActionTableNavDevPluginAdmin } from "./edit";

export const ActionsTableNavDevPluginAdmin = (
  props: ShowAdminNavPluginsObj
) => {
  return (
    <div className="flex gap-1">
      <EditActionTableNavDevPluginAdmin {...props} />
      {/* <DeleteActionTableNavAdmin {...props} /> */}
    </div>
  );
};
