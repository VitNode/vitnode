import { Module } from '@nestjs/common';

import { ShowTopicsForumsResolver } from './show/show.resolver';
import { ShowTopicsForumsService } from './show/show.service';
import { CreateForumTopicsResolver } from './create/create.resolver';
import { CreateForumTopicsService } from './create/create.service';

@Module({
  providers: [
    ShowTopicsForumsResolver,
    ShowTopicsForumsService,
    CreateForumTopicsResolver,
    CreateForumTopicsService
  ]
})
export class TopicsForumModule {}
