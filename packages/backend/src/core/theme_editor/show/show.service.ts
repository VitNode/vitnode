import { ABSOLUTE_PATHS_BACKEND, getConfigFile } from '@/index';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

import { keysFromCSSThemeEditor } from '../theme_editor.module';
import {
  ColorsShowCoreThemeEditor,
  HslColor,
  ShowCoreThemeEditorObj,
} from './dto/show.obj';

@Injectable()
export class ShowCoreThemeEditorService {
  protected getColors(): ShowCoreThemeEditorObj['colors'] {
    const pathToCss = join(
      ABSOLUTE_PATHS_BACKEND.frontend.init,
      'src',
      'app',
      '[locale]',
      'global.css',
    );

    if (!fs.existsSync(pathToCss)) {
      return;
    }

    const cssAsString = fs.readFileSync(pathToCss, 'utf8');
    const colors: ColorsShowCoreThemeEditor = {} as ColorsShowCoreThemeEditor;
    for (const variable of keysFromCSSThemeEditor) {
      colors[variable.replace('-', '_')] = this.getVariable({
        cssAsString,
        variable,
      });
    }

    return colors;
  }

  protected getVariable({
    cssAsString,
    variable,
  }: {
    cssAsString: string;
    variable: string;
  }): {
    dark: HslColor;
    light: HslColor;
  } {
    const regex = new RegExp(`:root\\s*{([^}]*)}|\\.dark\\s*{([^}]*)}`, 'g');
    let match: null | RegExpExecArray;
    const values = {
      light: '',
      dark: '',
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
      dark: this.parseStringToHsl(values.dark),
    };
  }

  private parseStringToHsl(string: string): HslColor {
    const values = string
      .trim()
      .replaceAll('%', '')
      .replaceAll('deg', '')
      .split(' ')
      .map(v => parseInt(v));

    return {
      h: values[0],
      s: values[1],
      l: values[2],
    };
  }

  show(): ShowCoreThemeEditorObj {
    const config = getConfigFile();

    return {
      colors: this.getColors(),
      logos: config.logos,
    };
  }
}
