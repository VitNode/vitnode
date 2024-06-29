import { Module } from '@nestjs/common';

import { LayoutAdminInstallResolver } from './layout/layout.resolver';
import { LayoutAdminInstallService } from './layout/layout.service';
import { CreateDatabaseAdminInstallResolver } from './create_database/create_database.resolver';
import { CreateDatabaseAdminInstallService } from './create_database/create_database.service';

@Module({
  providers: [
    LayoutAdminInstallResolver,
    LayoutAdminInstallService,
    CreateDatabaseAdminInstallResolver,
    CreateDatabaseAdminInstallService,
  ],
})
export class AdminInstallModule {}
