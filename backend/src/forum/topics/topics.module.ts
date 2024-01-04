import { Module } from '@nestjs/common';

import { ShowTopicsForumsResolver } from './show/show.resolver';
import { ShowTopicsForumsService } from './show/show.service';
import { CreateForumTopicsResolver } from './create/create.resolver';
import { CreateForumTopicsService } from './create/create.service';

import { LockToggleForumTopicsResolver } from '@/src/forum/topics/actions/lock_unlock/lock_toggle.resolver';
import { LockToggleForumTopicsService } from '@/src/forum/topics/actions/lock_unlock/lock_toggle.service';

@Module({
  providers: [
    ShowTopicsForumsResolver,
    ShowTopicsForumsService,
    CreateForumTopicsResolver,
    CreateForumTopicsService,
    LockToggleForumTopicsResolver,
    LockToggleForumTopicsService
  ]
})
export class TopicsForumModule {}
