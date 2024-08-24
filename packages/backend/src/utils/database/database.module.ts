import { DynamicModule, Global, Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { PoolConfig } from 'pg';

import { SortDirectionEnum } from '../pagination';
import { InternalDatabaseService } from './internal_database.service';

registerEnumType(SortDirectionEnum, {
  name: 'SortDirectionEnum',
});

export interface DatabaseModuleArgs {
  config: PoolConfig;
  schemaDatabase: Record<string, unknown>;
}

@Global()
@Module({})
export class InternalDatabaseModule {
  static register(options: DatabaseModuleArgs): DynamicModule {
    return {
      module: InternalDatabaseModule,
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
