import { Module } from "@nestjs/common";

import { CoreNavModule } from "./nav/nav.module";

@Module({
  imports: [CoreNavModule]
})
export class CoreModule {}
