import { Injectable } from '@nestjs/common';
import { InternalDatabaseService } from 'vitnode-backend';

import { schemaDatabase } from './database/config';

@Injectable()
export class DatabaseService extends InternalDatabaseService<
  typeof schemaDatabase
> {}
