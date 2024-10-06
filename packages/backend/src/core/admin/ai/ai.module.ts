import { Module } from '@nestjs/common';

import { TestAdminCoreAiResolver } from './test/test.resolver';
import { TestAdminCoreAiService } from './test/test.service';

@Module({
  providers: [TestAdminCoreAiResolver, TestAdminCoreAiService],
})
export class AdminAiModule {}
