import { Module } from '@nestjs/common';

import { CoreSessionsCron } from './sessions.cron';
import { SignInSessionsCoreService } from './sign_in/sign_in.service';
import { SessionsCoreController } from './sessions.controller';

@Module({
  controllers: [SessionsCoreController],
  providers: [CoreSessionsCron, SignInSessionsCoreService],
})
export class SessionsCoreModule {}
