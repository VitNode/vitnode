import tableCore from "../plugins/core/admin/database/index";
// import tableForum from "../forum/admin/database/index";
// import tableBlog from "../blog/admin/database/index";
// ! === IMPORT ===

export const schemaDatabase = {
  // ...tableForum,
  // ...tableBlog,
  // ! === MODULE ===
  ...tableCore
};
