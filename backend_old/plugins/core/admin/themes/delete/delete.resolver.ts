import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { DeleteAdminThemesService } from "./delete.service";
import { DeleteAdminThemesArgs } from "./dto/delete.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class DeleteAdminThemesResolver {
  constructor(private readonly service: DeleteAdminThemesService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_themes__delete(
    @Args() args: DeleteAdminThemesArgs
  ): Promise<string> {
    return await this.service.delete(args);
  }
}
