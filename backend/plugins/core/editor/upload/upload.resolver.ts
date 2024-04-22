import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { UploadCoreEditorService } from "./upload.service";
import { UploadCoreEditorObj } from "./dto/upload.obj";
import { UploadCoreEditorArgs } from "./dto/upload.args";

import { AuthGuards } from "@/utils/guards/auth.guard";
import { CurrentUser, User } from "@/utils/decorators/user.decorator";

@Resolver()
export class UploadCoreEditorResolver {
  constructor(private readonly service: UploadCoreEditorService) {}

  @Mutation(() => UploadCoreEditorObj)
  @UseGuards(AuthGuards)
  async core_editor__upload(
    @CurrentUser() currentUser: User,
    @Args() args: UploadCoreEditorArgs
  ): Promise<UploadCoreEditorObj> {
    return await this.service.upload(currentUser, args);
  }
}
