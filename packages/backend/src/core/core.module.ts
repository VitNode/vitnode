import { Module } from '@nestjs/common';

import { CoreMiddlewareModule } from './middleware/middleware.module';

@Module({
  imports: [CoreMiddlewareModule],
})
export class CoreModule {}
