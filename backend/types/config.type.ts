export interface ConfigType {
  applications: string[];
  finished_install: boolean;
  languages: {
    default: string;
    locales: {
      enabled: boolean;
      key: string;
    }[];
  };
  side_name: string;
}
