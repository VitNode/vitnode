import {
  ConfigPlugin,
  NavPluginInfoJSONTypeWithChildren,
} from '@/providers/plugins.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersAdminNavPluginsService {
  protected findItemByCode({
    items,
    code,
  }: {
    code: string;
    items: ConfigPlugin['nav'];
  }): NavPluginInfoJSONTypeWithChildren | null {
    for (const item of items) {
      if (item.code === code) {
        return item;
      }

      if (item.children) {
        const found = this.findItemByCode({ items: item.children, code });
        if (found) {
          return {
            ...found,
            parent_code: item.code,
          };
        }
      }
    }

    return null;
  }
}
