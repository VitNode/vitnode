import { CreateAdminPluginsArgs } from '../core/admin/plugins/create/create.dto';

interface NavPluginInfoJSONType {
  code: string;
  icon: null | string;
  keywords: string[];
}

export interface NavPluginInfoJSONTypeWithChildren
  extends NavPluginInfoJSONType {
  children?: NavPluginInfoJSONType[];
}

export interface PluginInfoJSONType extends CreateAdminPluginsArgs {
  allow_default: boolean;
  nav: NavPluginInfoJSONTypeWithChildren[];
  version: string;
  version_code: number;
}

export interface ConfigPlugin extends PluginInfoJSONType {
  version: string;
  version_code: number;
}
