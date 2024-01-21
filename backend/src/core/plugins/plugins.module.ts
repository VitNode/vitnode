import { Module } from '@nestjs/common';

import { ShowCorePluginsService } from './show/show.service';
import { ShowCorePluginsResolver } from './show/show.resolver';

@Module({
  providers: [ShowCorePluginsService, ShowCorePluginsResolver]
})
export class CorePluginsModule {}
