import { CreateAdminPluginsArgs } from "../core/admin/plugins/create/dto/create.args";

interface NavPluginInfoJSONType {
  code: string;
  href: string;
  icon: string | null;
}

export interface NavPluginInfoJSONTypeWithChildren
  extends NavPluginInfoJSONType {
  children?: NavPluginInfoJSONType[];
}

export interface PluginInfoJSONType extends CreateAdminPluginsArgs {
  allow_default: boolean;
  nav: NavPluginInfoJSONTypeWithChildren[];
}

export interface ConfigPlugin extends PluginInfoJSONType {
  version: string;
  version_code: number;
}
