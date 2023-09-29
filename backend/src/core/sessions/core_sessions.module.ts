import { Module } from '@nestjs/common';

import { SignInCoreSessionsService } from './sign_in/sign_in-core_sessions.service';
import { SignInCoreSessionsResolver } from './sign_in/sign_in-core_sessions.resolver';
import { AuthorizationCoreSessionsService } from './authorization/authorization-core_sessions.service';
import { AuthorizationCoreSessionsResolver } from './authorization/authorization-core_sessions.resolver';
import { SignOutCoreSessionsService } from './sign_out/sign_out-core_sessions.service';
import { SignOutCoreSessionsResolver } from './sign_out/sign_out-core_sessions.resolver';
import { AuthorizationAdminCoreSessionsResolver } from './admin_authorization/authorization_admin-core_sessions.resolver';
import { AuthorizationAdminCoreSessionsService } from './admin_authorization/authorization_admin_authorization-core_sessions.service';

@Module({
  providers: [
    SignInCoreSessionsService,
    SignInCoreSessionsResolver,
    AuthorizationCoreSessionsService,
    AuthorizationCoreSessionsResolver,
    SignOutCoreSessionsService,
    SignOutCoreSessionsResolver,
    AuthorizationAdminCoreSessionsResolver,
    AuthorizationAdminCoreSessionsService
  ]
})
export class CoreSessionsModule {}
