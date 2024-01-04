import { Module } from '@nestjs/common';

import { ShowForumForumsResolver } from './show/show.resolver';
import { ShowForumForumsService } from './show/show.service';

@Module({
  providers: [ShowForumForumsResolver, ShowForumForumsService]
})
export class ForumsForumModule {}
