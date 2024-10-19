import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminFilesArgs, ShowAdminFilesObj } from './show.dto';
import { ShowAdminFilesService } from './show.service';

@Resolver()
export class ShowAdminFilesResolver {
  constructor(private readonly service: ShowAdminFilesService) {}

  @Query(() => ShowAdminFilesObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'files',
    permission: 'can_manage_files',
  })
  async admin__core_files__show(
    @Args() args: ShowAdminFilesArgs,
  ): Promise<ShowAdminFilesObj> {
    return this.service.show(args);
  }
}
