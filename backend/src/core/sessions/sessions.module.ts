import { Global, Module } from "@nestjs/common";

import { SignInCoreSessionsService } from "./sign_in/sign_in.service";
import { SignInCoreSessionsResolver } from "./sign_in/sign_in.resolver";
import { AuthorizationCoreSessionsService } from "./authorization/authorization.service";
import { AuthorizationCoreSessionsResolver } from "./authorization/authorization.resolver";
import { SignOutCoreSessionsService } from "./sign_out/sign_out.service";
import { SignOutCoreSessionsResolver } from "./sign_out/sign_out.resolver";
import { InternalAuthorizationCoreSessionsService } from "./authorization/internal/internal_authorization.service";
import { CoreSessionsCron } from "./sessions.cron";

@Module({
  providers: [
    SignInCoreSessionsService,
    SignInCoreSessionsResolver,
    AuthorizationCoreSessionsService,
    AuthorizationCoreSessionsResolver,
    SignOutCoreSessionsService,
    SignOutCoreSessionsResolver,
    CoreSessionsCron
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
