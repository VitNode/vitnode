import { Module } from '@nestjs/common';

import { CoreMiddlewareResolver } from './middleware.resolver';
import { CoreMiddlewareService } from './middleware.service';

@Module({
  providers: [CoreMiddlewareResolver, CoreMiddlewareService]
})
export class CoreMiddlewareModule {}
