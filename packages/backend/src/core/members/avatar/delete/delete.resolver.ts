import { Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { DeleteAvatarCoreMembersService } from "./delete.service";

import { AuthGuards } from "../../../../utils";
import { CurrentUser, User } from "../../../../decorators";

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
