import { Module } from '@nestjs/common';

import { SignInCoreSessionsService } from './signIn/signIn-core_sessions.service';
import { SignInCoreSessionsResolver } from './signIn/signIn-core_sessions.resolver';

@Module({
  providers: [SignInCoreSessionsService, SignInCoreSessionsResolver]
})
export class CoreSessionsModule {}
