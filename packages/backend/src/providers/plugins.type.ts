import { CreateAdminPluginsArgs } from '../core/admin/plugins/create/create.dto';

interface NavPluginInfoJSONType {
  code: string;
  icon: null | string;
  keywords: string[];
}

interface PermissionsAdminPluginInfoJSONType {
  id: string;
}

export interface NavPluginInfoJSONTypeWithChildren
  extends NavPluginInfoJSONType {
  children?: NavPluginInfoJSONType[];
  parent_code?: string;
}

export interface PluginInfoJSONType extends CreateAdminPluginsArgs {
  allow_default: boolean;
  nav: NavPluginInfoJSONTypeWithChildren[];
  permissions_admin?: ({
    children: PermissionsAdminPluginInfoJSONType[];
  } & PermissionsAdminPluginInfoJSONType)[];
  version: string;
  version_code: number;
}

export interface ConfigPlugin extends PluginInfoJSONType {
  version: string;
  version_code: number;
}
