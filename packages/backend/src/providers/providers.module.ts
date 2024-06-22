import { Global, Module } from "@nestjs/common";

import { AuthorizationAdminSessionsService } from "../core/admin/sessions/authorization/authorization.service";
import { InternalAuthorizationCoreSessionsService } from "../core/sessions/authorization/internal/internal_authorization.service";
import { EmailHelpersService } from "./email/email-helpers.service";

@Global()
@Module({
  providers: [
    {
      provide: "IOAdminAuthGuards",
      useClass: AuthorizationAdminSessionsService
    },
    {
      provide: "IOAuthGuards",
      useClass: InternalAuthorizationCoreSessionsService
    },
    {
      provide: "EmailHelpersService",
      useClass: EmailHelpersService
    }
  ],
  exports: ["IOAdminAuthGuards", "IOAuthGuards", "EmailHelpersService"]
})
export class GlobalProvidersModule {}
