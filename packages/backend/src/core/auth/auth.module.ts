import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { ShowAuthService } from './services/show.service';

@Module({
  providers: [ShowAuthService],
  controllers: [AuthController],
})
export class AuthModule {}
