import { DynamicModule, Global, Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { PoolConfig } from 'pg';

import { InternalDatabaseService } from './internal_database.service';
import { SortDirectionEnum } from '../pagination';

registerEnumType(SortDirectionEnum, {
  name: 'SortDirectionEnum',
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
          provide: 'DATABASE_MODULE_OPTIONS',
          useValue: options,
        },
        InternalDatabaseService,
      ],
      exports: [InternalDatabaseService],
    };
  }
}
