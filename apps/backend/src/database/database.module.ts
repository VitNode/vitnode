import { Global, Module } from '@nestjs/common';

import { DatabaseService } from './database.service';
import { DATABASE_ENVS, schemaDatabase } from './config';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_MODULE_OPTIONS',
      useValue: { config: DATABASE_ENVS, schemaDatabase },
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
