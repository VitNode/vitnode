import { Module } from '@nestjs/common';

import { AdminNavStylesModule } from './nav/nav.module';
import { AdminEditorStylesModule } from './editor/editor.module';

@Module({
  imports: [AdminNavStylesModule, AdminEditorStylesModule],
})
export class AdminStylesModule {}
