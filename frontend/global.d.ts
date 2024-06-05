type IntlMessages = typeof import("@/plugins/core/langs/en.json") &
  typeof import("@/plugins/forum/langs/en.json") &
  // ! === IMPORT ===
  typeof import("@/plugins/blog/langs/en.json") &
  typeof import("@/plugins/admin/langs/en.json");
