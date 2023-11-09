import { Module } from '@nestjs/common';

import { LayoutAdminInstallResolver } from './layout/layout-admin_install.resolver';
import { LayoutAdminInstallService } from './layout/layout-admin_install.service';

@Module({
  providers: [LayoutAdminInstallResolver, LayoutAdminInstallService]
})
export class AdminInstallModule {}
