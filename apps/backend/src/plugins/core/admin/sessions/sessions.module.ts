import { Global, Module } from "@nestjs/common";

import { AuthorizationAdminSessionsResolver } from "./authorization/authorization.resolver";
import { AuthorizationAdminSessionsService } from "./authorization/authorization.service";
import { SignOutAdminSessionsService } from "./sign_out/sign_out.service";
import { SignOutAdminSessionsResolver } from "./sign_out/sign_out.resolver";

@Module({
  providers: [SignOutAdminSessionsService, SignOutAdminSessionsResolver]
})
export class AdminSessionsModule {}

@Global()
@Module({
  providers: [
    AuthorizationAdminSessionsResolver,
    AuthorizationAdminSessionsService
  ],
  exports: [
    AuthorizationAdminSessionsResolver,
    AuthorizationAdminSessionsService
  ]
})
export class GlobalAdminSessionsModule {}
