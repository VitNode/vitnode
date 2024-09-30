import { Global, Module } from '@nestjs/common';

import { AiService } from './provider/ai.service';

@Global()
@Module({
  providers: [AiService],
  exports: [AiService],
})
export class GlobalCoreAiModule {}
