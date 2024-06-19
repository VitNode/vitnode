import { Context, Mutation, Resolver } from "@nestjs/graphql";
import { Ctx } from "vitnode-backend";

import { SignOutCoreSessionsService } from "./sign_out.service";

@Resolver()
export class SignOutCoreSessionsResolver {
  constructor(private readonly service: SignOutCoreSessionsService) {}

  @Mutation(() => String)
  async core_sessions__sign_out(@Context() context: Ctx): Promise<string> {
    return this.service.signOut(context);
  }
}
