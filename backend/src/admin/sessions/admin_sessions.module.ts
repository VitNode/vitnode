import { Global, Module } from '@nestjs/common';

import { AuthorizationAdminSessionsResolver } from './authorization/authorization-admin_sessions.resolver';
import { AuthorizationAdminSessionsService } from './authorization/authorization-admin_sessions.service';
import { SignOutAdminSessionsService } from './sign_out/sign_out-admin_sessions.service';
import { SignOutAdminSessionsResolver } from './sign_out/sign_out-admin_sessions.resolver';

@Module({
  providers: [SignOutAdminSessionsService, SignOutAdminSessionsResolver]
})
export class AdminSessionsModule {}

@Global()
@Module({
  providers: [AuthorizationAdminSessionsResolver, AuthorizationAdminSessionsService],
  exports: [AuthorizationAdminSessionsResolver, AuthorizationAdminSessionsService]
})
export class GlobalAdminSessionsModule {}
