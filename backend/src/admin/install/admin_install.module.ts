import { Module } from '@nestjs/common';

import { LayoutAdminInstallResolver } from './layout/layout-admin_install.resolver';
import { LayoutAdminInstallService } from './layout/layout-admin_install.service';
import { CreateDatabaseAdminInstallResolver } from './create_database/create_database-core_install.resolver';
import { CreateDatabaseAdminInstallService } from './create_database/create_database-core_install.service';

@Module({
  providers: [
    LayoutAdminInstallResolver,
    LayoutAdminInstallService,
    CreateDatabaseAdminInstallResolver,
    CreateDatabaseAdminInstallService
  ]
})
export class AdminInstallModule {}
