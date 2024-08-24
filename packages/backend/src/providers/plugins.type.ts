import { CreateAdminPluginsArgs } from '../core/admin/plugins/create/dto/create.args';

interface NavPluginInfoJSONType {
  code: string;
  href: string;
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
