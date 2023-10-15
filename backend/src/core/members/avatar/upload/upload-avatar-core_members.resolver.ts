import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UploadAvatarCoreMembersService } from './upload-avatar-core_members.service';
import { UploadAvatarCoreMembersArgs } from './dto/upload-avatar-core_members.args';

import { User, CurrentUser } from '@/utils/decorators/user.decorator';
import { AuthGuards } from '@/utils/guards/auth.guards';
import { UploadCoreAttachmentsObj } from '../../../attachments/upload/dto/upload-core_attachments.obj';

@Resolver()
export class UploadAvatarCoreMembersResolver {
  constructor(private readonly service: UploadAvatarCoreMembersService) {}

  @Mutation(() => UploadCoreAttachmentsObj)
  @UseGuards(AuthGuards)
  async upload_avatar_core_members(
    @CurrentUser() currentUser: User,
    @Args() args: UploadAvatarCoreMembersArgs
  ): Promise<UploadCoreAttachmentsObj> {
    return await this.service.uploadAvatar(currentUser, args);
  }
}
