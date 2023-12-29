import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { ShowCoreLanguages } from '../show/dto/show.obj';
import { EditCoreLanguagesArgs } from './dto/edit.args';

import { PrismaService } from '@/prisma/prisma.service';
import { ConfigType } from '@/types/config.type';

@Injectable()
export class EditCoreLanguageService {
  constructor(private prisma: PrismaService) {}

  async edit({ id, ...rest }: EditCoreLanguagesArgs): Promise<ShowCoreLanguages> {
    const configFile = fs.readFileSync(join('..', 'config.json'), 'utf8');
    const config: ConfigType = JSON.parse(configFile);

    await this.prisma.core_languages.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        timezone: true,
        protected: true,
        default: true,
        enabled: true
      }
    });

    const dataToEditConfig = config;

    // Edit default language
    if (rest.default) {
      dataToEditConfig.languages.default = id;

      // Disable previous default language
      await this.prisma.core_languages.updateMany({
        where: { default: true },
        data: { default: false }
      });
    }

    const edit = await this.prisma.core_languages.update({
      where: { id },
      data: rest,
      select: {
        id: true,
        name: true,
        timezone: true,
        protected: true,
        default: true,
        enabled: true
      }
    });

    if (rest.default) {
      dataToEditConfig.languages.default = edit.default ? edit.id : config.languages.default;
    }

    // Edit enabled status
    dataToEditConfig.languages.locales.find(locale => locale.key === edit.id).enabled =
      edit.enabled;

    fs.writeFile(
      join('..', 'config.json'),
      JSON.stringify(dataToEditConfig, null, 2),
      'utf8',
      err => {
        if (err) throw err;
      }
    );

    return edit;
  }
}
