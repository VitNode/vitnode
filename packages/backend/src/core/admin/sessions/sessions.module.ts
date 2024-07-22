import { Global, Module } from '@nestjs/common';

import { AuthorizationAdminSessionsResolver } from './authorization/authorization.resolver';
import { AuthorizationAdminSessionsService } from './authorization/authorization.service';
import { SignOutAdminSessionsService } from './sign_out/sign_out.service';
import { SignOutAdminSessionsResolver } from './sign_out/sign_out.resolver';
import { AdminNavModule } from '../nav/nav.module';
import { SearchAdminSessionsService } from './search/search.service';
import { SearchAdminSessionsResolver } from './search/search.resolver';

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
    {
      provide: 'IOAdminAuthGuards',
      useClass: AuthorizationAdminSessionsService,
    },
  ],
  exports: [
    AuthorizationAdminSessionsResolver,
    AuthorizationAdminSessionsService,
  ],
  imports: [AdminNavModule],
})
export class GlobalAdminSessionsModule {}
