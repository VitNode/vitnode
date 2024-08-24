import { schemaDatabase } from '@/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

// Overwrite the DatabaseService class to include the db property
declare module 'vitnode-backend' {
  export declare class DatabaseService {
    db: NodePgDatabase<typeof schemaDatabase>;
  }
}
