import { Module } from "@nestjs/common";

import {
  AdminSessionsModule,
  GlobalAdminSessionsModule
} from "./sessions/sessions.module";

@Module({
  imports: [GlobalAdminSessionsModule, AdminSessionsModule]
})
export class AdminModule {}
