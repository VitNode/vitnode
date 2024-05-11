import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";

import { ChangeCoreThemesArgs } from "./dto/change.args";
import { ChangeCoreThemesService } from "./change.service";
import { Ctx } from "@/utils/types/context.type";

@Resolver()
export class ChangeThemesResolver {
  constructor(private readonly service: ChangeCoreThemesService) {}

  @Mutation(() => String)
  async core_themes__change(
    @Args() args: ChangeCoreThemesArgs,
    @Context() context: Ctx
  ): Promise<string> {
    return await this.service.change(args, context);
  }
}
