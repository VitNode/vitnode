import { Module } from '@nestjs/common';

import { EditAdminEditorStylesService } from './edit/edit.service';
import { EditAdminEditorStylesResolver } from './edit/edit.resolver';

@Module({
  providers: [EditAdminEditorStylesService, EditAdminEditorStylesResolver],
})
export class AdminEditorStylesModule {}
