import { Module } from '@nestjs/common';

import { AuthorizationAdminSessionsResolver } from './authorization/authorization-admin_sessions.resolver';
import { AuthorizationAdminSessionsService } from './authorization/authorization-admin_sessions.service';

@Module({
  providers: [AuthorizationAdminSessionsResolver, AuthorizationAdminSessionsService]
})
export class AdminSessionsModule {}
