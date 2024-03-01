import { EditActionForumAdmin } from "./edit";
import { DeleteActionForumAdmin } from "./delete/delete";

import type { ShowForumForumsAdminWithChildren } from "../../hooks/use-forum-forums-admin-api";

interface ActionsForumAdminProps
  extends Omit<ShowForumForumsAdminWithChildren, "children"> {
  childrenCount: number;
}

export const ActionsForumAdmin = (props: ActionsForumAdminProps) => {
  return (
    <div className="flex gap-2 flex-shrink-0">
      <EditActionForumAdmin {...props} />
      {props.childrenCount > 0 && <DeleteActionForumAdmin {...props} />}
    </div>
  );
};
