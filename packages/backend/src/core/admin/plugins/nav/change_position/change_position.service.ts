import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { ChangePositionAdminNavPluginsArgs } from "./dto/change_position.args";
import { HelpersAdminNavPluginsService } from "../helpers.service";

import { NotFoundError } from "../../../../../errors";
import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin } from "../../../../..";

@Injectable()
export class ChangePositionAdminNavPluginsService extends HelpersAdminNavPluginsService {
  protected findAndRemoveItemByCode({
    items,
    code,
  }: {
    code: string;
    items: ConfigPlugin["nav"];
  }): ConfigPlugin["nav"] {
    return items.filter(item => {
      if (item.code === code) {
        return false;
      }

      if (item.children) {
        item.children = this.findAndRemoveItemByCode({
          items: item.children,
          code,
        });
      }

      return true;
    });
  }

  changePosition({
    code,
    plugin_code,
    index_to_move,
    parent_code,
  }: ChangePositionAdminNavPluginsArgs): string {
    const pathConfig = ABSOLUTE_PATHS_BACKEND.plugin({
      code: plugin_code,
    }).config;
    if (!fs.existsSync(pathConfig)) {
      throw new NotFoundError("Plugin");
    }
    const config: ConfigPlugin = JSON.parse(
      fs.readFileSync(pathConfig, "utf8"),
    );

    // Find the item to be moved
    const itemToMove = this.findItemByCode({ items: config.nav, code });
    if (!itemToMove) {
      throw new NotFoundError("Item");
    }

    // Remove the item from its current position
    config.nav = this.findAndRemoveItemByCode({
      items: config.nav,
      code,
    });

    // If parent_code is provided, add the item to the parent's children
    if (parent_code) {
      const parentItem = this.findItemByCode({
        items: config.nav,
        code: parent_code,
      });
      if (!parentItem) {
        throw new NotFoundError("Parent");
      }

      parentItem.children = parentItem.children || [];
      parentItem.children.splice(index_to_move, 0, itemToMove);
    } else {
      // If parent_code is not provided, add the item to the root of the nav array
      config.nav.splice(index_to_move, 0, itemToMove);
    }

    // Save config
    fs.writeFileSync(pathConfig, JSON.stringify(config, null, 2));

    return "Success!";
  }
}
