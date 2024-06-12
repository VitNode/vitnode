import { Global, Module } from "@nestjs/common";
import { registerEnumType } from "@nestjs/graphql";
import { SortDirectionEnum } from "@vitnode/backend";

import { DatabaseService } from "./database.service";

registerEnumType(SortDirectionEnum, {
  name: "SortDirectionEnum"
});

@Global()
@Module({
  exports: [DatabaseService],
  providers: [DatabaseService]
})
export class DatabaseModule {}
