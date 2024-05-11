import { ConfigType } from "@vitnode/shared";

export const DEFAULT_CONFIG_DATA: ConfigType = {
  rebuild_required: {
    themes: false,
    langs: false,
    plugins: false
  },
  editor: {
    sticky: true,
    allow_head_h1: false,
    files: {
      allow_type: "all"
    }
  },
  settings: {
    general: {
      site_name: "VitNode Community",
      site_short_name: "VitNode"
    }
  }
};
