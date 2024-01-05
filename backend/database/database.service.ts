import { Injectable } from '@nestjs/common';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import tableCore from '../src/core/database/schema/index';

const schema = {
  ...tableCore
};

@Injectable()
export class DatabaseService {
  public db: NodePgDatabase<typeof schema>;

  constructor() {
    const pool = new Pool({
      host: 'localhost',
      port: 5432,
      user: 'root',
      password: 'root',
      database: 'vitnode'
    });

    this.db = drizzle(pool, { schema });
  }
}
