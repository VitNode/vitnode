import { Module } from '@nestjs/common';

import { MiddlewareController } from './middleware.controller';
import { ShowMiddlewareService } from './services/show.service';

@Module({
  providers: [ShowMiddlewareService],
  controllers: [MiddlewareController],
})
export class MiddlewareModule {}
