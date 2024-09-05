import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminFilesArgs, ShowAdminFilesObj } from './show.dto';
import { ShowAdminFilesService } from './show.service';

@Resolver()
export class ShowAdminFilesResolver {
  constructor(private readonly service: ShowAdminFilesService) {}

  @Query(() => ShowAdminFilesObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_files__show(
    @Args() args: ShowAdminFilesArgs,
  ): Promise<ShowAdminFilesObj> {
    return this.service.show(args);
  }
}
