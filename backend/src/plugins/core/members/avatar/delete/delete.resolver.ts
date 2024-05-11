import { Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { DeleteAvatarCoreMembersService } from "./delete.service";

import { User, CurrentUser } from "@/utils/decorators/user.decorator";
import { AuthGuards } from "@/utils/guards/auth.guard";

@Resolver()
export class DeleteAvatarCoreMembersResolver {
  constructor(private readonly service: DeleteAvatarCoreMembersService) {}

  @Mutation(() => String)
  @UseGuards(AuthGuards)
  async core_members__avatar__delete(
    @CurrentUser() currentUser: User
  ): Promise<string> {
    return await this.service.deleteAvatar(currentUser);
  }
}
