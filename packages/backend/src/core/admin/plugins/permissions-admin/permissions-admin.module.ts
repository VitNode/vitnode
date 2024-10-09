import { Module } from '@nestjs/common';

import { CreateEditAdminPermissionsAdminPluginsResolver } from './create-edit/create-edit.resolver';
import { CreateEditAdminPermissionsAdminPluginsService } from './create-edit/create-edit.service';
import { DeleteAdminPermissionsAdminPluginsResolver } from './delete/delete.resolver';
import { DeleteAdminPermissionsAdminPluginsService } from './delete/delete.service';
import { ShowAdminPermissionsAdminPluginsResolver } from './show/show.resolver';
import { ShowAdminPermissionsAdminPluginsService } from './show/show.service';

@Module({
  providers: [
    ShowAdminPermissionsAdminPluginsResolver,
    ShowAdminPermissionsAdminPluginsService,
    CreateEditAdminPermissionsAdminPluginsService,
    CreateEditAdminPermissionsAdminPluginsResolver,
    DeleteAdminPermissionsAdminPluginsResolver,
    DeleteAdminPermissionsAdminPluginsService,
  ],
})
export class AdminPermissionsAdminPluginsModule {}
