import { EditActionForumAdmin } from "./edit";
import { DeleteActionForumAdmin } from "./delete/delete";

import { ShowForumForumsAdminWithChildren } from "../../hooks/use-forum-forums-admin-api";

interface ActionsForumAdminProps
  extends Omit<ShowForumForumsAdminWithChildren, "children"> {
  childrenCount: number;
}

export const ActionsForumAdmin = (props: ActionsForumAdminProps) => {
  return (
    <div className="flex shrink-0 gap-2">
      <EditActionForumAdmin {...props} />
      {props.childrenCount === 0 && <DeleteActionForumAdmin {...props} />}
    </div>
  );
};
