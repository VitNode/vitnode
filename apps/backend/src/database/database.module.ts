import { Global, Module } from '@nestjs/common';

import { DATABASE_ENVS, schemaDatabase } from './config';
import { DatabaseService } from './database.service';

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
