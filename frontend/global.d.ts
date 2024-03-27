type IntlMessages = typeof import("@/langs/en/core.json") &
  // ! === IMPORT ===
  typeof import("@/langs/en/admin.json") &
  typeof import("@/langs/en/forum.json") &
  typeof import("@/langs/en/blog.json");
