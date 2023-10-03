import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UploadAvatarCoreMembersService } from './upload-avatar-core_members.service';
import { UploadAvatarCoreMembersArgs } from './dto/upload-avatar-core_members.args';

@Resolver()
export class UploadAvatarCoreMembersResolver {
  constructor(private readonly service: UploadAvatarCoreMembersService) {}

  @Mutation(() => String)
  async upload_avatar_core_members(@Args() args: UploadAvatarCoreMembersArgs): Promise<string> {
    return await this.service.uploadAvatar(args);
  }
}
