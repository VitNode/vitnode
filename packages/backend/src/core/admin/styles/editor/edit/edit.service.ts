import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import { EditAdminEditorStylesArgs } from './dto/edit.args';

import { configPath, getConfigFile } from '../../../../../providers/config';
import { EditorShowCoreMiddleware } from '../../../../middleware/show/dto/show.obj';

@Injectable()
export class EditAdminEditorStylesService {
  constructor() {}

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
