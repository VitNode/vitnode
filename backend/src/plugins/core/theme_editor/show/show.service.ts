import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NotFoundError } from "@vitnode/backend";

import {
  ColorsShowCoreThemeEditor,
  HslColor,
  ShowCoreThemeEditorObj
} from "./dto/show.obj";

import { getThemeId } from "../../settings/helpers/get-theme-id";
import { DatabaseService } from "@/database/database.service";
import { Ctx } from "@/utils/types/context.type";
import { ABSOLUTE_PATHS } from "@/config";
import { keysFromCSSThemeEditor } from "../../admin/theme_editor/edit/edit.service";

@Injectable()
export class ShowCoreThemeEditorService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService
  ) {}

  private parseStringToHsl(string: string): HslColor {
    const values = string
      .trim()
      .replaceAll("%", "")
      .replaceAll("deg", "")
      .split(" ")
      .map(v => parseInt(v));

    return {
      h: values[0],
      s: values[1],
      l: values[2]
    };
  }

  protected getVariable({
    cssAsString,
    variable,
    themeId
  }: {
    cssAsString: string;
    themeId: number;
    variable: string;
  }): {
    dark: HslColor;
    light: HslColor;
  } {
    const regex = new RegExp(
      `html\\[data-theme-id="${themeId}"\\]\\s*{([^}]*)}|html\\[data-theme-id="${themeId}"\\]\\.dark\\s*{([^}]*)}`,
      "g"
    );
    let match: RegExpExecArray | null;
    const values = {
      light: "",
      dark: ""
    };

    while ((match = regex.exec(cssAsString)) !== null) {
      const value = match[1] || match[2];
      const isDark = Boolean(match[2]);
      const backgroundMatch = value.match(`--${variable}:\\s*([^;]*)`);

      if (backgroundMatch) {
        if (isDark) {
          values.dark = backgroundMatch[1].trim();
        } else {
          values.light = backgroundMatch[1].trim();
        }
      }
    }

    return {
      light: this.parseStringToHsl(values.light),
      dark: this.parseStringToHsl(values.dark)
    };
  }

  async show({ req }: Ctx): Promise<ShowCoreThemeEditorObj> {
    const themeId = await getThemeId({
      ctx: { req },
      databaseService: this.databaseService,
      configService: this.configService
    });
    const pathToCss = join(
      ABSOLUTE_PATHS.frontend.theme({ theme_id: themeId }).root,
      "core",
      "layout",
      "global.css"
    );

    if (!fs.existsSync(pathToCss)) {
      throw new NotFoundError("CSS file in Theme not found!");
    }

    const cssAsString = fs.readFileSync(pathToCss, "utf8");
    const colors: ColorsShowCoreThemeEditor = keysFromCSSThemeEditor.reduce(
      (acc, variable) => {
        acc[variable.replace("-", "_")] = this.getVariable({
          cssAsString,
          variable,
          themeId
        });

        return acc;
      },
      {} as ColorsShowCoreThemeEditor
    );

    return {
      colors
    };
  }
}
