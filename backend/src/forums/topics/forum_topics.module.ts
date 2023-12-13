import { Module } from '@nestjs/common';

import { ShowTopicsForumsResolver } from './show/show.resolver';
import { ShowTopicsForumsService } from './show/show.service';

@Module({
  providers: [ShowTopicsForumsResolver, ShowTopicsForumsService]
})
export class TopicsForumModule {}
