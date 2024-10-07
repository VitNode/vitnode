import { Module } from '@nestjs/common';

import { ShowAdminPermissionsAdminPluginsResolver } from './show/show.resolver';
import { ShowAdminPermissionsAdminPluginsService } from './show/show.service';

@Module({
  providers: [
    ShowAdminPermissionsAdminPluginsResolver,
    ShowAdminPermissionsAdminPluginsService,
  ],
})
export class AdminPermissionsAdminPluginsModule {}
