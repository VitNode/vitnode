import { Global, Module } from "@nestjs/common";
import { registerEnumType } from "@nestjs/graphql";

import { DatabaseService } from "./database.service";

import { SortDirectionEnum } from "@/utils/types/database/sort-direction.type";

registerEnumType(SortDirectionEnum, {
  name: "SortDirectionEnum"
});

@Global()
@Module({
  exports: [DatabaseService],
  providers: [DatabaseService]
})
export class DatabaseModule {}
