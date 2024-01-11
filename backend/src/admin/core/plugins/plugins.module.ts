import { Module } from '@nestjs/common';

import { TestPluginsService } from './test/test.service';
import { TestPluginsResolver } from './test/test.resolver';

@Module({
  providers: [TestPluginsService, TestPluginsResolver]
})
export class AdminPluginsModule {}
