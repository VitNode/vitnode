import { Global, Module } from "@nestjs/common";

import { AuthorizationAdminSessionsService } from "./core/admin/sessions/authorization/authorization.service";
import { InternalAuthorizationCoreSessionsService } from "./core/sessions/authorization/internal/internal_authorization.service";

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
    }
  ],
  exports: ["IOAdminAuthGuards", "IOAuthGuards"]
})
export class GlobalGuardsModule {}
