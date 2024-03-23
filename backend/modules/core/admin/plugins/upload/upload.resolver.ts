import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { UploadAdminPluginsService } from "./upload.service";
import { UploadAdminPluginsArgs } from "./dto/upload.args";
import { ShowAdminPlugins } from "../show/dto/show.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class UploadAdminPluginsResolver {
  constructor(private readonly service: UploadAdminPluginsService) {}

  @Mutation(() => ShowAdminPlugins)
  @UseGuards(AdminAuthGuards)
  async admin__core_plugins__upload(
    @Args() args: UploadAdminPluginsArgs
  ): Promise<ShowAdminPlugins> {
    return await this.service.upload(args);
  }
}
