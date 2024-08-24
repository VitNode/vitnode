import { Module } from '@nestjs/common';

import { EditAdminThemeEditorResolver } from './edit/edit.resolver';
import { EditAdminThemeEditorService } from './edit/edit.service';

@Module({
  providers: [EditAdminThemeEditorService, EditAdminThemeEditorResolver],
})
export class AdminThemeEditorModule {}
