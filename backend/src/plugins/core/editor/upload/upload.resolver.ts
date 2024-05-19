import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { UploadCoreEditorService } from "./upload.service";
import { UploadCoreEditorArgs } from "./dto/upload.args";

import { AuthGuards, OptionalAuth } from "@/utils/guards/auth.guard";
import { CurrentUser, User } from "@/utils/decorators/user.decorator";
import { ShowCoreFiles } from "../../files/show/dto/show.obj";

@Resolver()
export class UploadCoreEditorResolver {
  constructor(private readonly service: UploadCoreEditorService) {}

  @Mutation(() => ShowCoreFiles)
  @OptionalAuth()
  @UseGuards(AuthGuards)
  async core_editor_files__upload(
    @Args() args: UploadCoreEditorArgs,
    @CurrentUser() currentUser?: User
  ): Promise<ShowCoreFiles> {
    return this.service.upload(currentUser, args);
  }
}
