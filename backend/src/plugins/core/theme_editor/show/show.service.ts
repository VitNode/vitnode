import { Injectable } from "@nestjs/common";
import { getThemeId } from "../../settings/helpers/get-theme-id";
import { DatabaseService } from "@/database/database.service";
import { ConfigService } from "@nestjs/config";
import { Ctx } from "@/utils/types/context.type";
import { ABSOLUTE_PATHS } from "@/config";
import { join } from "path";
import * as fs from "fs";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { HslColor, ShowCoreThemeEditor } from "./dto/show.obj";

@Injectable()
export class ShowCoreThemeEditorService {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService
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
    variable
  }: {
    cssAsString: string;
    variable: string;
  }): {
    light: HslColor;
    dark: HslColor;
  } {
    const regex =
      /html\[data-theme-id="1"\]\s*{([^}]*)}|html\[data-theme-id="1"\]\.dark\s*{([^}]*)}/g;
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

  async show({ req }: Ctx): Promise<ShowCoreThemeEditor> {
    const theme_id = await getThemeId({
      ctx: { req },
      databaseService: this.databaseService,
      configService: this.configService
    });
    const pathToCss = join(
      ABSOLUTE_PATHS.frontend.themes,
      `${theme_id}`,
      "core",
      "layout",
      "global.css"
    );

    if (!fs.existsSync(pathToCss)) {
      throw new NotFoundError("CSS file in Theme not found!");
    }

    const cssString = fs.readFileSync(pathToCss, "utf8");
    const test = this.getVariable({
      cssAsString: cssString,
      variable: "primary"
    });

    return {
      primary: {
        light: test.light,
        dark: test.dark
      }
    };
  }
}
