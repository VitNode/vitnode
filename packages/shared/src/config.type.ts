export interface ConfigType {
  editor: {
    files: {
      allow_type: 'all' | 'images_videos' | 'images' | 'none';
    };
    sticky: boolean;
  };
  langs: {
    code: string;
    default: boolean;
    enabled: boolean;
  }[];
  rebuild_required: {
    langs: boolean;
    plugins: boolean;
  };
  settings: {
    email: {
      color_primary: string;
      color_primary_foreground: string;
    };
    general: {
      site_name: string;
      site_short_name: string;
    };
  };
}
