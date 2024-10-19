import { CurrentUser, User } from '@/decorators';
import { FileUpload, GraphQLUpload } from '@/graphql-upload';
import { AuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UploadAvatarCoreMembersObj } from './upload.dto';
import { UploadAvatarCoreMembersService } from './upload.service';

@Resolver()
export class UploadAvatarCoreMembersResolver {
  constructor(private readonly service: UploadAvatarCoreMembersService) {}

  @Mutation(() => UploadAvatarCoreMembersObj)
  @UseGuards(AuthGuards)
  async core_members__avatar__upload(
    @CurrentUser() currentUser: User,
    @Args('file', { type: () => GraphQLUpload }) file: Promise<FileUpload>,
  ): Promise<UploadAvatarCoreMembersObj> {
    return await this.service.uploadAvatar(currentUser, { file });
  }
}
