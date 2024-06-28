import { Mutation, Resolver } from "@nestjs/graphql";
import { ResetPasswordCoreMembersService } from "./reset_password.service";

@Resolver
export class ResetPasswordCoreMembersResolver {
  constructor(private readonly service: ResetPasswordCoreMembersService) {}

  @Mutation(() => ResetPasswordCoreMembersObj)
  async core_members__reset_password(
    @Args() args: ResetPasswordCoreMembersArgs
  ): Promise<ResetPasswordCoreMembersObj> {
    return this.service.reset_password(args);
  }
}
