export interface ConfigType {
  agree_terms: boolean;
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
