import { DynamicModule, Global, Module } from '@nestjs/common';
import { LanguageModel } from 'ai';

import { AiService } from './provider/ai.service';

@Global()
@Module({})
export class GlobalCoreAiModule {
  static register({ aiModel }: { aiModel?: LanguageModel }): DynamicModule {
    return {
      module: GlobalCoreAiModule,
      providers: [
        {
          provide: 'VITNODE_AI_MODEL',
          useValue: aiModel,
        },
        AiService,
      ],
      exports: [AiService],
    };
  }
}
