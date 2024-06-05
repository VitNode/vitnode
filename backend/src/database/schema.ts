import tableCore from "../plugins/core/admin/database/index";
import tableBlog from "../plugins/blog/admin/database/index";
// ! === IMPORT ===

export const schemaDatabase = {
  ...tableBlog,
  // ! === MODULE ===
  ...tableCore
};
