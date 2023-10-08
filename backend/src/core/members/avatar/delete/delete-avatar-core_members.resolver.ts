import { Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { DeleteAvatarCoreMembersService } from './delete-avatar_core_members.service';

import { User, CurrentUser } from '@/utils/decorators/user.decorator';
import { AuthGuards } from '@/utils/guards/auth.guards';

@Resolver()
export class DeleteAvatarCoreMembersResolver {
  constructor(private readonly service: DeleteAvatarCoreMembersService) {}

  @Mutation(() => String)
  @UseGuards(AuthGuards)
  async delete_avatar_core_members(@CurrentUser() currentUser: User): Promise<string> {
    return await this.service.deleteAvatar(currentUser);
  }
}
