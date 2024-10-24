import type { DatabaseModuleArgs } from '@/utils/database/database.module';

import { Inject, Injectable } from '@nestjs/common';

import coreSchemaDatabase from '../../database';
import { createClientDatabase, DetermineClient } from './client';

@Injectable()
export class InternalDatabaseService<
  T extends Record<string, unknown> = typeof coreSchemaDatabase,
> {
  constructor(
    @Inject('DATABASE_MODULE_OPTIONS')
    private readonly options: DatabaseModuleArgs,
  ) {
    const client = createClientDatabase({
      schemaDatabase: this.options.schemaDatabase,
      config: this.options.config,
    });

    this.db = client.db as DetermineClient<T>;
  }

  public db: DetermineClient<T>;
}
