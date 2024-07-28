import { join } from 'path';
import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import { EditAdminThemeEditorArgs, ThemeVariableInput } from './dto/edit.args';

import {
  ABSOLUTE_PATHS_BACKEND,
  configPath,
  getConfigFile,
  NotFoundError,
} from '../../../..';
import { keysFromCSSThemeEditor } from '../../../theme_editor/theme_editor.module';
import { UploadCoreFilesService } from '@/core/files/helpers/upload/upload.service';

@Injectable()
export class EditAdminThemeEditorService {
  constructor(private readonly uploadFile: UploadCoreFilesService) {}

  protected changeVariable({
    cssAsString,
    variable,
    newValues,
  }: {
    cssAsString: string;
    newValues: ThemeVariableInput;
    variable: string;
  }): string {
    const regex = new RegExp(
      `(:root\\s*{[^}]*)--${variable}:\\s*([^;]*)([^}]*)|(\\.dark\\s*{[^}]*)--${variable}:\\s*([^;]*)([^}]*)`,
      'g',
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

  protected updateColors(colors: EditAdminThemeEditorArgs['colors']) {
    const pathToCss = join(
      ABSOLUTE_PATHS_BACKEND.frontend.init,
      'app',
      'global.css',
    );

    if (!fs.existsSync(pathToCss)) {
      throw new NotFoundError('CSS file in Theme not found!');
    }

    const cssAsString = fs.readFileSync(pathToCss, 'utf8');
    let colorsStringUpdate = cssAsString;

    keysFromCSSThemeEditor.forEach(key => {
      const formatKey = key.replace('-', '_');

      colorsStringUpdate = this.changeVariable({
        cssAsString: colorsStringUpdate,
        variable: key,
        newValues: colors[formatKey],
      });
    });

    fs.writeFileSync(pathToCss, colorsStringUpdate);
  }

  private async updateLogos(logos: EditAdminThemeEditorArgs['logos']) {
    // Upload logos
    const [dark, light] = await this.uploadFile.upload({
      acceptMimeType: ['image/png', 'image/jpeg'],
      files: [logos.dark, logos.light],
      plugin: 'core',
      folder: 'logos',
      maxUploadSizeBytes: 1024 * 1024,
    });

    const config = getConfigFile();
    config.logos = {
      mobile_width: logos.mobile_width,
      text: logos.text,
      width: logos.width,
      dark,
      light,
    };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }

  async edit({ colors, logos }: EditAdminThemeEditorArgs): Promise<string> {
    if (colors) {
      this.updateColors(colors);
    }
    await this.updateLogos(logos);

    return 'Success!';
  }
}
