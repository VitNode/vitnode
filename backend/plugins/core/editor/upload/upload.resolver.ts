import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { UploadCoreEditorService } from "./upload.service";
import { UploadCoreEditorArgs } from "./dto/upload.args";

import { AuthGuards } from "@/utils/guards/auth.guard";
import { CurrentUser, User } from "@/utils/decorators/user.decorator";
import { ShowCoreFiles } from "../../files/show/dto/show.obj";

@Resolver()
export class UploadCoreEditorResolver {
  constructor(private readonly service: UploadCoreEditorService) {}

  @Mutation(() => ShowCoreFiles)
  @UseGuards(AuthGuards)
  async core_editor_files__upload(
    @CurrentUser() currentUser: User,
    @Args() args: UploadCoreEditorArgs
  ): Promise<ShowCoreFiles> {
    return await this.service.upload(currentUser, args);
  }
}
