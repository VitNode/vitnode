import { Context, Mutation, Resolver } from "@nestjs/graphql";

import { SignOutAdminSessionsService } from "./sign_out.service";

import { Ctx } from "@/src/types/context.type";

@Resolver()
export class SignOutAdminSessionsResolver {
  constructor(private readonly service: SignOutAdminSessionsService) {}

  @Mutation(() => String)
  async admin_sessions__sign_out(@Context() context: Ctx): Promise<string> {
    return await this.service.signOut(context);
  }
}
