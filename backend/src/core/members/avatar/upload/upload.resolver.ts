import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UploadAvatarCoreMembersService } from './upload.service';
import { UploadAvatarCoreMembersArgs } from './dto/upload.args';

import { User, CurrentUser } from '@/utils/decorators/user.decorator';
import { AuthGuards } from '@/utils/guards/auth.guards';
import { UploadCoreAttachmentsObj } from '../../../attachments/upload/dto/upload.obj';

@Resolver()
export class UploadAvatarCoreMembersResolver {
  constructor(private readonly service: UploadAvatarCoreMembersService) {}

  @Mutation(() => UploadCoreAttachmentsObj)
  @UseGuards(AuthGuards)
  async core_members__avatar__upload(
    @CurrentUser() currentUser: User,
    @Args() args: UploadAvatarCoreMembersArgs
  ): Promise<UploadCoreAttachmentsObj> {
    return await this.service.uploadAvatar(currentUser, args);
  }
}
