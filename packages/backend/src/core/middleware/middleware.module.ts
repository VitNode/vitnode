import { Module } from '@nestjs/common';

import { CoreMiddlewareCron } from './middleware.cron';
import { ShowCoreMiddlewareResolver } from './show/show.resolver';
import { ShowCoreMiddlewareService } from './show/show.service';

@Module({
  providers: [
    CoreMiddlewareCron,
    ShowCoreMiddlewareService,
    ShowCoreMiddlewareResolver,
  ],
})
export class CoreMiddlewareModule {}
