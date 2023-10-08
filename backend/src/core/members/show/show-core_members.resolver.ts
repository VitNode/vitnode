import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowCoreMembersService } from './show-core_members.service';
import { ShowCoreMembersObj } from './dto/show-core_members.obj';
import { ShowCoreMembersArgs } from './dto/show-core_members.args';

import { AuthGuards } from '@/utils/guards/auth.guards';

@Resolver()
export class ShowCoreMembersResolver {
  constructor(private readonly service: ShowCoreMembersService) {}

  @Query(() => ShowCoreMembersObj)
  @UseGuards(AuthGuards)
  async show_core_members(@Args() args: ShowCoreMembersArgs): Promise<ShowCoreMembersObj> {
    return await this.service.show(args);
  }
}
