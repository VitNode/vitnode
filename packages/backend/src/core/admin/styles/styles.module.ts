import { Module } from '@nestjs/common';

import { AdminEditorStylesModule } from './editor/editor.module';
import { AdminNavStylesModule } from './nav/nav.module';

@Module({
  imports: [AdminNavStylesModule, AdminEditorStylesModule],
})
export class AdminStylesModule {}
