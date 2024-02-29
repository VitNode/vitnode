import { Global, Module } from "@nestjs/common";
import { registerEnumType } from "@nestjs/graphql";

import { DatabaseService } from "./database.service";

import { SortDirectionEnum } from "@/src/types/database/sortDirection.type";

registerEnumType(SortDirectionEnum, {
  name: "SortDirectionEnum"
});

@Global()
@Module({
  exports: [DatabaseService],
  providers: [DatabaseService]
})
export class DatabaseModule {}
