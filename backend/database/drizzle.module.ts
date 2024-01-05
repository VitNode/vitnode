import { DynamicModule, Module } from '@nestjs/common';

import { DrizzleService } from './drizzle.service';

export interface DrizzleOptions {
  url: string;
}

@Module({})
export class DrizzleModule {
  static forRoot(options: DrizzleOptions): DynamicModule {
    return {
      module: DrizzleModule,
      providers: [
        {
          provide: 'DRIZZLE_OPTIONS',
          useValue: options
        },
        DrizzleService
      ],
      exports: [DrizzleService],
      global: true
    };
  }
}
