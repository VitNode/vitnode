import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { ChangePasswordCoreMembersArgs } from "./dto/change_password.args";
import { ChangePasswordCoreMembersObj } from "./dto/change_password.obj";
import { ChangePasswordCoreMembersService } from "./change_password.service";

@Resolver()
export class ChangePasswordCoreMembersResolver {
  constructor(private readonly service: ChangePasswordCoreMembersService) {}

  @Mutation(() => ChangePasswordCoreMembersObj)
  async core_members__change_password(
    @Args() args: ChangePasswordCoreMembersArgs
  ): Promise<ChangePasswordCoreMembersObj> {
    return this.service.change_password(args);
  }
}
