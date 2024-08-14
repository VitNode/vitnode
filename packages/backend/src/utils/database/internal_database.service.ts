import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { createClientDatabase } from './client';

import coreSchemaDatabase from '../../database';
import { DatabaseModuleArgs } from '@/utils/database/database.module';

@Injectable()
export class InternalDatabaseService<
  T extends Record<string, unknown> = typeof coreSchemaDatabase,
> {
  public db: NodePgDatabase<T>;

  constructor(
    @Inject('DATABASE_MODULE_OPTIONS')
    private readonly options: DatabaseModuleArgs,
  ) {
    const client = createClientDatabase({
      schemaDatabase: this.options.schemaDatabase,
      config: this.options.config,
    });

    this.db = client.db as NodePgDatabase<T>;
  }
}
