import { Module } from '@nestjs/common';

import { MiddlewareController } from './middleware.controller';
import { CoreMiddlewareCron } from './middleware.cron';
import { ShowCoreMiddlewareResolver } from './show/show.resolver';
import { ShowCoreMiddlewareService } from './show/show.service';

@Module({
  providers: [
    CoreMiddlewareCron,
    ShowCoreMiddlewareService,
    ShowCoreMiddlewareResolver,
  ],
  controllers: [MiddlewareController],
})
export class CoreMiddlewareModule {}
