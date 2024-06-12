import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { Ctx } from "@vitnode/backend";

import { ChangeCoreThemesArgs } from "./dto/change.args";
import { ChangeCoreThemesService } from "./change.service";

@Resolver()
export class ChangeThemesResolver {
  constructor(private readonly service: ChangeCoreThemesService) {}

  @Mutation(() => String)
  async core_themes__change(
    @Args() args: ChangeCoreThemesArgs,
    @Context() context: Ctx
  ): Promise<string> {
    return this.service.change(args, context);
  }
}
