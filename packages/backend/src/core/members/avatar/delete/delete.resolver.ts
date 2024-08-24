import { CurrentUser, User } from '@/decorators';
import { AuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAvatarCoreMembersService } from './delete.service';

@Resolver()
export class DeleteAvatarCoreMembersResolver {
  constructor(private readonly service: DeleteAvatarCoreMembersService) {}

  @Mutation(() => String)
  @UseGuards(AuthGuards)
  async core_members__avatar__delete(
    @CurrentUser() currentUser: User,
  ): Promise<string> {
    return this.service.deleteAvatar(currentUser);
  }
}
