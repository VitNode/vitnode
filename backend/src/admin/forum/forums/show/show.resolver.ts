import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowForumForumsAdminService } from './show.service';
import { ShowForumForumsAdminObj } from './dto/show.obj';

import { ShowForumForumsArgs } from '../../../../forum/forums/show/dto/show.args';
import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class ShowForumForumsAdminResolver {
  constructor(private readonly service: ShowForumForumsAdminService) {}

  @Query(() => ShowForumForumsAdminObj)
  @UseGuards(AdminAuthGuards)
  async forum_forums__admin__show(
    @Args() args: ShowForumForumsArgs
  ): Promise<ShowForumForumsAdminObj> {
    return await this.service.show(args);
  }
}
