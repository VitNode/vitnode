import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({})
export class VitNodeCoreModule {
  static register({ pathToEnvFile }: { pathToEnvFile: string }): DynamicModule {
    return {
      module: VitNodeCoreModule,
      imports: [ScheduleModule.forRoot()],
    };
  }
}
