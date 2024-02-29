import { Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { DeleteAvatarCoreMembersService } from "./delete.service";

import { User, CurrentUser } from "@/src/utils/decorators/user.decorator";
import { AuthGuards } from "@/src/utils/guards/auth.guards";

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
