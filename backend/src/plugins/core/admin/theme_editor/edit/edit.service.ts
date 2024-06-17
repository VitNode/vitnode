import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NotFoundError } from "@vitnode/backend";

import { EditAdminThemeEditorArgs, ThemeVariableInput } from "./dto/edit.args";

import { ABSOLUTE_PATHS } from "@/config";
import { DatabaseService } from "@/database/database.service";
import { setRebuildRequired } from "@/functions/rebuild-required";

export const keysFromCSSThemeEditor = [
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "background",
  "destructive",
  "destructive-foreground",
  "cover",
  "cover-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "card",
  "border"
] as const;

@Injectable()
export class EditAdminThemeEditorService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService
  ) {}

  protected changeVariable({
    cssAsString,
    variable,
    newValues
  }: {
    cssAsString: string;
    newValues: ThemeVariableInput;
    variable: string;
  }): string {
    const regex = new RegExp(
      `(:root\\s*{[^}]*)--${variable}:\\s*([^;]*)([^}]*)|(\\.dark\\s*{[^}]*)--${variable}:\\s*([^;]*)([^}]*)`,
      "g"
    );

    return cssAsString.replace(regex, (match, p1, p2, p3, p4, p5, p6) => {
      if (p1) {
        // light theme
        return `${p1}--${variable}: ${newValues.light.h} ${newValues.light.s}% ${newValues.light.l}%${p3}`;
      }

      // dark theme
      return `${p4}--${variable}: ${newValues.dark.h} ${newValues.dark.s}% ${newValues.dark.l}%${p6}`;
    });
  }

  async edit({ colors }: EditAdminThemeEditorArgs): Promise<string> {
    const pathToCss = join(
      ABSOLUTE_PATHS.plugin({ code: "core" }).frontend.templates,
      "layout",
      "global.css"
    );

    if (!fs.existsSync(pathToCss)) {
      throw new NotFoundError("CSS file in Theme not found!");
    }

    const cssAsString = fs.readFileSync(pathToCss, "utf8");
    let colorsStringUpdate = cssAsString;

    keysFromCSSThemeEditor.forEach(key => {
      const formatKey = key.replace("-", "_");

      colorsStringUpdate = this.changeVariable({
        cssAsString: colorsStringUpdate,
        variable: key,
        newValues: colors[formatKey]
      });
    });

    fs.writeFileSync(pathToCss, colorsStringUpdate);
    await setRebuildRequired({ set: "themes" });

    return "Success!";
  }
}
