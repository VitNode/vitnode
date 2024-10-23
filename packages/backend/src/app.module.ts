import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { CoreModule } from './core/core.module';

@Module({})
export class VitNodeCoreModule {
  static register({ pathToEnvFile }: { pathToEnvFile: string }): DynamicModule {
    return {
      module: VitNodeCoreModule,
      imports: [ScheduleModule.forRoot(), CoreModule],
    };
  }
}
