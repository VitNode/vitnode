export interface ConfigType {
  applications: string[];
  languages: {
    default: string;
    locales: {
      enabled: boolean;
      key: string;
    }[];
  };
  side_name: string;
}
