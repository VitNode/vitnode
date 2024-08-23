import { Module } from '@nestjs/common';

import { ShowAdminAuthorizationSettingsService } from './show/show.service';
import { ShowAdminAuthorizationSettingsResolver } from './show/show.resolver';
import { EditAdminAuthorizationSettingsService } from './edit/edit.service';
import { EditAdminAuthorizationSettingsResolver } from './edit/edit.resolver';

@Module({
  providers: [
    ShowAdminAuthorizationSettingsService,
    ShowAdminAuthorizationSettingsResolver,
    EditAdminAuthorizationSettingsService,
    EditAdminAuthorizationSettingsResolver,
  ],
})
export class AdminAuthorizationSettingsModule {}
