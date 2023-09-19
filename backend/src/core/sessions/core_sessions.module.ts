import { Module } from '@nestjs/common';

import { SignInCoreSessionsService } from './sign-in/sign-in-core_sessions.service';
import { SignInCoreSessionsResolver } from './sign-in/sign-in-core_sessions.resolver';
import { AuthorizationCoreSessionsService } from './authorization/authorization-core_sessions.service';
import { AuthorizationCoreSessionsResolver } from './authorization/authorization-core_sessions.resolver';

@Module({
  providers: [
    SignInCoreSessionsService,
    SignInCoreSessionsResolver,
    AuthorizationCoreSessionsService,
    AuthorizationCoreSessionsResolver
  ]
})
export class CoreSessionsModule {}
