import { Global, Module } from '@nestjs/common';

import { SignInCoreSessionsService } from './sign_in/sign_in-core_sessions.service';
import { SignInCoreSessionsResolver } from './sign_in/sign_in-core_sessions.resolver';
import { AuthorizationCoreSessionsService } from './authorization/authorization-core_sessions.service';
import { AuthorizationCoreSessionsResolver } from './authorization/authorization-core_sessions.resolver';
import { SignOutCoreSessionsService } from './sign_out/sign_out-core_sessions.service';
import { SignOutCoreSessionsResolver } from './sign_out/sign_out-core_sessions.resolver';
import { AdminAuthorizationCoreSessionsResolver } from './admin_authorization/admin_authorization-core_sessions.resolver';
import { AdminAuthorizationCoreSessionsService } from './admin_authorization/admin_authorization-core_sessions.service';
import { InternalAuthorizationCoreSessionsService } from './authorization/internal/internal_authorization-core_sessions.service';

@Module({
  providers: [
    SignInCoreSessionsService,
    SignInCoreSessionsResolver,
    AuthorizationCoreSessionsService,
    AuthorizationCoreSessionsResolver,
    SignOutCoreSessionsService,
    SignOutCoreSessionsResolver,
    AdminAuthorizationCoreSessionsResolver,
    AdminAuthorizationCoreSessionsService
  ]
})
export class CoreSessionsModule {}

@Global()
@Module({
  providers: [
    AuthorizationCoreSessionsService,
    AuthorizationCoreSessionsResolver,
    InternalAuthorizationCoreSessionsService
  ],
  exports: [
    AuthorizationCoreSessionsService,
    AuthorizationCoreSessionsResolver,
    InternalAuthorizationCoreSessionsService
  ]
})
export class GlobalCoreSessionsModule {}
