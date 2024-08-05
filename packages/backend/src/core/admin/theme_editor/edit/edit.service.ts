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
import { FilesService } from '@/core/files/helpers/upload/upload.service';

@Injectable()
export class EditAdminThemeEditorService {
  constructor(private readonly files: FilesService) {}

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
    if (!colors) return;
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
    const config = getConfigFile();

    await Promise.all(
      ['dark', 'light', 'mobile_dark', 'mobile_light'].map(async el => {
        if (logos[el]?.keep && config.logos[el]) return;

        if (config.logos[el]) {
          this.files.delete({
            dir_folder: config.logos[el].dir_folder,
            file_name: config.logos[el].file_name,
          });
          delete config.logos[el];
        }

        if (logos[el]?.file) {
          const upload = await this.files.upload({
            acceptMimeType: ['image/png', 'image/jpeg'],
            file: logos[el].file,
            plugin: 'core',
            folder: 'logos',
            maxUploadSizeBytes: 1024 * 1024,
          });
          config.logos[el] = upload;
        }
      }),
    );

    config.logos = {
      ...config.logos,
      mobile_width: logos.mobile_width,
      text: logos.text,
      width: logos.width,
    };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }

  async edit({ colors, logos }: EditAdminThemeEditorArgs): Promise<string> {
    this.updateColors(colors);
    await this.updateLogos(logos);

    return 'Success!';
  }
}
