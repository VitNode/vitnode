import { EditorShowCoreMiddleware } from '@/core/middleware/show/show.dto';
import { configPath, getConfigFile } from '@/providers/config';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { EditAdminEditorStylesArgs } from './edit.dto';

@Injectable()
export class EditAdminEditorStylesService {
  edit(data: EditAdminEditorStylesArgs): EditorShowCoreMiddleware {
    const config = getConfigFile();

    config.editor = {
      ...config.editor,
      ...data,
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    return config.editor;
  }
}
