import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminPlugins } from '../show/dto/show.obj';
import { UploadAdminPluginsArgs } from './dto/upload.args';
import { UploadAdminPluginsService } from './upload.service';

@Resolver()
export class UploadAdminPluginsResolver {
  constructor(private readonly service: UploadAdminPluginsService) {}

  @Mutation(() => ShowAdminPlugins)
  @UseGuards(AdminAuthGuards)
  async admin__core_plugins__upload(
    @Args() args: UploadAdminPluginsArgs,
  ): Promise<ShowAdminPlugins> {
    return this.service.upload(args);
  }
}
