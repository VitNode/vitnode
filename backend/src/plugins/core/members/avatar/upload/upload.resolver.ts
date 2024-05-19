import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { UploadAvatarCoreMembersService } from "./upload.service";
import { UploadAvatarCoreMembersArgs } from "./dto/upload.args";
import { UploadAvatarCoreMembersObj } from "./dto/upload.obj";

import { User, CurrentUser } from "@/utils/decorators/user.decorator";
import { AuthGuards } from "@/utils/guards/auth.guard";

@Resolver()
export class UploadAvatarCoreMembersResolver {
  constructor(private readonly service: UploadAvatarCoreMembersService) {}

  @Mutation(() => UploadAvatarCoreMembersObj)
  @UseGuards(AuthGuards)
  async core_members__avatar__upload(
    @CurrentUser() currentUser: User,
    @Args() args: UploadAvatarCoreMembersArgs
  ): Promise<UploadAvatarCoreMembersObj> {
    return this.service.uploadAvatar(currentUser, args);
  }
}
