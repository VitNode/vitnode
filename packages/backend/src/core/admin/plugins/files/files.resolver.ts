import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { FilesAdminPluginsArgs, FilesAdminPluginsObj } from './files.dto';
import { FilesAdminPluginsService } from './files.service';

@Resolver()
export class FilesAdminPluginsResolver {
  constructor(private readonly service: FilesAdminPluginsService) {}

  @Query(() => FilesAdminPluginsObj)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_plugins__files(
    @Args() args: FilesAdminPluginsArgs,
  ): Promise<FilesAdminPluginsObj> {
    return this.service.check(args);
  }
}
