import tableCore from "../core/admin/database/index";
import tableForum from "../forum/admin/database/index";
// ! === IMPORT ===

export const schemaDatabase = {
  ...tableCore,
  ...tableForum
  // ! === MODULE ===
};
