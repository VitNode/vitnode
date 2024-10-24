import { Module } from '@nestjs/common';

import { MiddlewareController } from './middleware.controller';
import { GetMiddlewareService } from './services/get.middleware.service';

@Module({
  providers: [GetMiddlewareService],
  controllers: [MiddlewareController],
})
export class CoreMiddlewareModule {}
