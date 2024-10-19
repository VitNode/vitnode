import { Global, Module } from '@nestjs/common';

import { AdminNavModule } from '../nav/nav.module';
import { AdminPermissionsAdminSessionsService } from './authorization/admin-permissions.service';
import { AuthorizationAdminSessionsResolver } from './authorization/authorization.resolver';
import { AuthorizationAdminSessionsService } from './authorization/authorization.service';
import { SearchAdminSessionsResolver } from './search/search.resolver';
import { SearchAdminSessionsService } from './search/search.service';
import { SignOutAdminSessionsResolver } from './sign_out/sign_out.resolver';
import { SignOutAdminSessionsService } from './sign_out/sign_out.service';

@Module({
  providers: [SignOutAdminSessionsService, SignOutAdminSessionsResolver],
})
export class AdminSessionsModule {}

@Global()
@Module({
  providers: [
    AuthorizationAdminSessionsResolver,
    AuthorizationAdminSessionsService,
    SearchAdminSessionsResolver,
    SearchAdminSessionsService,
    AdminPermissionsAdminSessionsService,
    {
      provide: 'IOAdminAuthGuards',
      useClass: AuthorizationAdminSessionsService,
    },
  ],
  exports: [
    AuthorizationAdminSessionsResolver,
    AuthorizationAdminSessionsService,
    AdminPermissionsAdminSessionsService,
  ],
  imports: [AdminNavModule],
})
export class GlobalAdminSessionsModule {}
