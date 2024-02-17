import type { ShowAdminGroups } from "@/graphql/hooks";
import { EditGroupsMembersDialogAdmin } from "./edit";
import { DeleteGroupsMembersDialogAdmin } from "./delete/delete";

export const ActionsTableGroupsMembersAdmin = (
  props: Omit<ShowAdminGroups, "default" | "root">
) => {
  return (
    <div className="flex items-center justify-end">
      <EditGroupsMembersDialogAdmin data={props} />

      {!props.protected && <DeleteGroupsMembersDialogAdmin {...props} />}
    </div>
  );
};
