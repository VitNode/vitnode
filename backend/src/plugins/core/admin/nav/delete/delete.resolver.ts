import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { DeleteAdminNavService } from "./delete.service";
import { DeleteAdminNavArgs } from "./dto/delete.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class DeleteAdminNavResolver {
  constructor(private readonly service: DeleteAdminNavService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_nav__delete(
    @Args() args: DeleteAdminNavArgs
  ): Promise<string> {
    return await this.service.delete(args);
  }
}
