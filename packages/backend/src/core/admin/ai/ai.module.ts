import { Module } from '@nestjs/common';

import { ShowAdminCoreAiResolver } from './show/show.resolver';
import { ShowAdminCoreAiService } from './show/show.service';

@Module({
  providers: [ShowAdminCoreAiResolver, ShowAdminCoreAiService],
})
export class AdminAiModule {}
