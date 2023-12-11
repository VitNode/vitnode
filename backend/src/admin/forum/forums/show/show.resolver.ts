import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowForumForumsAdminService } from './show.service';

import { ShowForumForumsArgs } from '../../../../forums/forums/show/dto/show.args';
import { ShowForumForumsObj } from '../../../../forums/forums/show/dto/show.obj';
import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class ShowForumForumsAdminResolver {
  constructor(private readonly service: ShowForumForumsAdminService) {}

  @Query(() => ShowForumForumsObj)
  @UseGuards(AdminAuthGuards)
  async forum_forums__admin__show(@Args() args: ShowForumForumsArgs): Promise<ShowForumForumsObj> {
    return await this.service.show(args);
  }
}
