import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { SearchAdminSessionsService } from './search.service';
import { SearchAdminSessionsArgs } from './dto/search.args';
import { SearchAdminSessionsObj } from './dto/search.obj';

import { AdminAuthGuards } from '@/utils';

@Resolver()
export class SearchAdminSessionsResolver {
  constructor(private readonly service: SearchAdminSessionsService) {}

  @Query(() => SearchAdminSessionsObj)
  @UseGuards(AdminAuthGuards)
  async admin__sessions__search(
    @Args() args: SearchAdminSessionsArgs,
  ): Promise<SearchAdminSessionsObj> {
    return this.service.search(args);
  }
}
