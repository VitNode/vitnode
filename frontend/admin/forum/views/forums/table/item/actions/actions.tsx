import { EditActionForumAdmin } from "./edit";
import { DeleteActionForumAdmin } from "./delete/delete";

import type { ShowForumForumsAdminWithChildren } from "../../hooks/use-forum-forums-admin-api";

export const ActionsForumAdmin = (
  props: Omit<ShowForumForumsAdminWithChildren, "children">
) => {
  return (
    <div className="flex gap-2 flex-shrink-0">
      <EditActionForumAdmin {...props} />
      <DeleteActionForumAdmin />
    </div>
  );
};
