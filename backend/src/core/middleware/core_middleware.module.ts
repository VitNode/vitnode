import { Module } from '@nestjs/common';

import { CoreMiddlewareResolver } from './middleware.resolver';
import { CoreMiddlewareService } from './middleware.service';
import { CoreMiddlewareCron } from './core_middleware.cron';

@Module({
  providers: [CoreMiddlewareResolver, CoreMiddlewareService, CoreMiddlewareCron]
})
export class CoreMiddlewareModule {}
