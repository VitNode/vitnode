import tableCore from "../plugins/core/admin/database/index";
import tableBlog from "../plugins/blog/admin/database/index";
import tableForum from "../plugins/forum/admin/database/index";
// ! === IMPORT ===

export const schemaDatabase = {
  ...tableBlog,
  ...tableForum,
  // ! === MODULE ===
  ...tableCore
};
