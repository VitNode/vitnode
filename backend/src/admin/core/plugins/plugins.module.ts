import { Module } from '@nestjs/common';

import { TestPluginsService } from './test/test.service';
import { TestPluginsResolver } from './test/test.resolver';
import { ShowAdminPluginsService } from './show/show.service';
import { ShowAdminPluginsResolver } from './show/show.resolver';
import { ChangePositionAdminPluginsService } from './change_position/change_position.service';
import { ChangePositionAdminPluginsResolver } from './change_position/change_position.resolver';

@Module({
  providers: [
    TestPluginsService,
    TestPluginsResolver,
    ShowAdminPluginsService,
    ShowAdminPluginsResolver,
    ChangePositionAdminPluginsService,
    ChangePositionAdminPluginsResolver
  ]
})
export class AdminPluginsModule {}
