import { DynamicModule, Global, Module } from "@nestjs/common";
import { registerEnumType } from "@nestjs/graphql";
import { PoolConfig } from "pg";

import { DatabaseService } from "./database.service";

import { SortDirectionEnum } from "..";

registerEnumType(SortDirectionEnum, {
  name: "SortDirectionEnum",
});

export interface DatabaseModuleArgs {
  config: PoolConfig;
  schemaDatabase: Record<string, unknown>;
}

@Global()
@Module({})
export class DatabaseModule {
  static register(options: DatabaseModuleArgs): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: "DATABASE_MODULE_OPTIONS",
          useValue: options,
        },
        DatabaseService,
      ],
      exports: [DatabaseService],
    };
  }
}
