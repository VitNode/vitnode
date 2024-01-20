import { Module } from '@nestjs/common';

import { TestPluginsService } from './test/test.service';
import { TestPluginsResolver } from './test/test.resolver';
import { ShowAdminPluginsService } from './show/show.service';
import { ShowAdminPluginsResolver } from './show/show.resolver';

@Module({
  providers: [
    TestPluginsService,
    TestPluginsResolver,
    ShowAdminPluginsService,
    ShowAdminPluginsResolver
  ]
})
export class AdminPluginsModule {}
