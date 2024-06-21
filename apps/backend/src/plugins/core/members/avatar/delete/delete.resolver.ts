import { Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { User, CurrentUser, AuthGuards } from "vitnode-backend";

import { DeleteAvatarCoreMembersService } from "./delete.service";

@Resolver()
export class DeleteAvatarCoreMembersResolver {
  constructor(private readonly service: DeleteAvatarCoreMembersService) {}

  @Mutation(() => String)
  @UseGuards(AuthGuards)
  async core_members__avatar__delete(
    @CurrentUser() currentUser: User
  ): Promise<string> {
    return this.service.deleteAvatar(currentUser);
  }
}
