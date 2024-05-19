import { Context, Mutation, Resolver } from "@nestjs/graphql";

import { SignOutAdminSessionsService } from "./sign_out.service";
import { Ctx } from "@/utils/types/context.type";

@Resolver()
export class SignOutAdminSessionsResolver {
  constructor(private readonly service: SignOutAdminSessionsService) {}

  @Mutation(() => String)
  async admin_sessions__sign_out(@Context() context: Ctx): Promise<string> {
    return this.service.signOut(context);
  }
}
