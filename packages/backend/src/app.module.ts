import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';

import { CoreModule } from './core/core.module';
import {
  DatabaseModuleArgs,
  InternalDatabaseModule,
} from './utils/database/database.module';

export const ABSOLUTE_PATHS = {
  plugins: join(process.cwd(), 'src', 'plugins'),
};

@Module({})
export class VitNodeCoreModule {
  static register({
    pathToEnvFile,
    database,
  }: {
    database: DatabaseModuleArgs;
    pathToEnvFile: string;
  }): DynamicModule {
    return {
      module: VitNodeCoreModule,
      imports: [
        ScheduleModule.forRoot(),
        CoreModule,
        InternalDatabaseModule.register(database),
      ],
    };
  }
}
