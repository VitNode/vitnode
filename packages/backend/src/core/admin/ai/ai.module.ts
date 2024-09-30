import { Module } from '@nestjs/common';

import { EditAdminCoreAiResolver } from './edit/edit.resolver';
import { EditAdminCoreAiService } from './edit/edit.service';
import { ShowAdminCoreAiResolver } from './show/show.resolver';
import { ShowAdminCoreAiService } from './show/show.service';
import { TestAdminCoreAiResolver } from './test/test.resolver';
import { TestAdminCoreAiService } from './test/test.service';

@Module({
  providers: [
    ShowAdminCoreAiResolver,
    ShowAdminCoreAiService,
    EditAdminCoreAiResolver,
    EditAdminCoreAiService,
    TestAdminCoreAiResolver,
    TestAdminCoreAiService,
  ],
})
export class AdminAiModule {}
