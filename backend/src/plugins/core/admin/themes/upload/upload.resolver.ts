import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { UploadAdminThemesService } from "./upload.service";
import { UploadAdminThemesArgs } from "./dto/upload.args";
import { ShowAdminThemes } from "../show/dto/show.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class UploadAdminThemesResolver {
  constructor(private readonly service: UploadAdminThemesService) {}

  @Mutation(() => ShowAdminThemes)
  @UseGuards(AdminAuthGuards)
  async admin__core_themes__upload(
    @Args() args: UploadAdminThemesArgs
  ): Promise<ShowAdminThemes> {
    return this.service.upload(args);
  }
}
