import { Module } from '@nestjs/common';

import { EditAdminEditorStylesResolver } from './edit/edit.resolver';
import { EditAdminEditorStylesService } from './edit/edit.service';

@Module({
  providers: [EditAdminEditorStylesService, EditAdminEditorStylesResolver],
})
export class AdminEditorStylesModule {}
