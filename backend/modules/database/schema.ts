import tableCore from "../core/admin/database/index";
import tableForum from "../forum/admin/database/index";
import tableBlogs from "../blogs/admin/database/index";
// ! === IMPORT ===

export const schemaDatabase = {
  ...tableCore,
  ...tableForum,
  ...tableBlogs
  // ! === MODULE ===
};
