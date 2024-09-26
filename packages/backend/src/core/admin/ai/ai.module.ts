import { Module } from '@nestjs/common';

import { EditAdminCoreAiResolver } from './edit/edit.resolver';
import { EditAdminCoreAiService } from './edit/edit.service';
import { ShowAdminCoreAiResolver } from './show/show.resolver';
import { ShowAdminCoreAiService } from './show/show.service';

@Module({
  providers: [
    ShowAdminCoreAiResolver,
    ShowAdminCoreAiService,
    EditAdminCoreAiResolver,
    EditAdminCoreAiService,
  ],
})
export class AdminAiModule {}
