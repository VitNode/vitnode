import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { MiddlewareModule } from './middleware/middleware.module';

@Module({
  imports: [MiddlewareModule, AuthModule],
})
export class CoreModule {}
