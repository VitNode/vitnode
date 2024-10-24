import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';

import { CoreModule } from './core/core.module';
import {
  DatabaseModuleArgs,
  InternalDatabaseModule,
} from './utils/database/database.module';

const internalPaths = {
  backend: join(process.cwd(), 'src'),
  frontend: join(process.cwd(), '..', 'frontend', 'src'),
  uploads: join(process.cwd(), 'uploads'),
  plugins: join(process.cwd(), 'src', 'plugins'),
};

export const ABSOLUTE_PATHS = {
  plugins: internalPaths.plugins,
  uploads: {
    public: join(internalPaths.uploads, 'public'),
    private: join(internalPaths.uploads, 'private'),
    temp: join(internalPaths.uploads, 'temp'),
  },
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
