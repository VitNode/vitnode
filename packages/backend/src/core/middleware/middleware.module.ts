import { Module } from '@nestjs/common';

import { MiddlewareController } from './middleware.controller';
import { ShowMiddlewareService } from './services/show.middleware.service';

@Module({
  providers: [ShowMiddlewareService],
  controllers: [MiddlewareController],
})
export class CoreMiddlewareModule {}
