import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AdminAuthGuards } from "vitnode-backend";

import { DeleteAdminNavService } from "./delete.service";
import { DeleteAdminNavArgs } from "./dto/delete.args";

@Resolver()
export class DeleteAdminNavResolver {
  constructor(private readonly service: DeleteAdminNavService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_nav__delete(
    @Args() args: DeleteAdminNavArgs
  ): Promise<string> {
    return this.service.delete(args);
  }
}
