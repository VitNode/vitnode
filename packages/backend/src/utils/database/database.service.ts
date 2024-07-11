import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { createClientDatabase } from './client';

import coreSchemaDatabase from '../../plugins/core/admin/database';
import { DatabaseModuleArgs } from '@/utils/database/database.module';

@Injectable()
export class DatabaseService {
  public db: NodePgDatabase<typeof coreSchemaDatabase>;

  constructor(
    @Inject('DATABASE_MODULE_OPTIONS')
    private readonly options: DatabaseModuleArgs,
  ) {
    const client = createClientDatabase({
      schemaDatabase: this.options.schemaDatabase,
      config: this.options.config,
    });

    this.db = client.db as NodePgDatabase<typeof coreSchemaDatabase>;
  }
}
