import { Module } from '@nestjs/common';

import { EditAdminMainSettingsResolver } from './edit/edit.resolver';
import { EditAdminMainSettingsService } from './edit/edit.service';
import { AdminMainSettingsController } from './main.controller';

@Module({
  controllers: [AdminMainSettingsController],
  providers: [EditAdminMainSettingsService, EditAdminMainSettingsResolver],
})
export class AdminMainSettingsModule {}
