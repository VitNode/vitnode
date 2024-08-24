import { Module } from '@nestjs/common';

import { EditAdminMainSettingsResolver } from './edit/edit.resolver';
import { EditAdminMainSettingsService } from './edit/edit.service';

@Module({
  providers: [EditAdminMainSettingsService, EditAdminMainSettingsResolver],
})
export class AdminMainSettingsModule {}
