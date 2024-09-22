import { Global, Module } from '@nestjs/common';

import { AiService } from './provider/ai.service';
import { TestCoreAiResolver } from './test/test.resolver';
import { TestCoreAiService } from './test/test.service';

@Global()
@Module({
  providers: [AiService],
  exports: [AiService],
})
export class GlobalCoreAiModule {}

@Module({
  providers: [TestCoreAiService, TestCoreAiResolver],
})
export class CoreAiModule {}
