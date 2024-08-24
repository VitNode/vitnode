import { Module } from '@nestjs/common';

import { EditAdminAuthorizationSettingsResolver } from './edit/edit.resolver';
import { EditAdminAuthorizationSettingsService } from './edit/edit.service';
import { ShowAdminAuthorizationSettingsResolver } from './show/show.resolver';
import { ShowAdminAuthorizationSettingsService } from './show/show.service';

@Module({
  providers: [
    ShowAdminAuthorizationSettingsService,
    ShowAdminAuthorizationSettingsResolver,
    EditAdminAuthorizationSettingsService,
    EditAdminAuthorizationSettingsResolver,
  ],
})
export class AdminAuthorizationSettingsModule {}
