import { CurrentUser, User } from '@/decorators';
import { AuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  UploadAvatarCoreMembersArgs,
  UploadAvatarCoreMembersObj,
} from './upload.dto';
import { UploadAvatarCoreMembersService } from './upload.service';

@Resolver()
export class UploadAvatarCoreMembersResolver {
  constructor(private readonly service: UploadAvatarCoreMembersService) {}

  @Mutation(() => UploadAvatarCoreMembersObj)
  @UseGuards(AuthGuards)
  async core_members__avatar__upload(
    @CurrentUser() currentUser: User,
    @Args() args: UploadAvatarCoreMembersArgs,
  ): Promise<UploadAvatarCoreMembersObj> {
    return this.service.uploadAvatar(currentUser, args);
  }
}
