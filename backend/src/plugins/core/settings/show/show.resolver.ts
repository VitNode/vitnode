import { Context, Query, Resolver } from "@nestjs/graphql";
import { Ctx } from "@vitnode/backend";

import { ShowSettingsService } from "./show.service";
import { ShowSettingsObj } from "./dto/show.obj";

@Resolver()
export class ShowCoreSettingsResolver {
  constructor(private readonly service: ShowSettingsService) {}

  @Query(() => ShowSettingsObj)
  async core_settings__show(@Context() context: Ctx): Promise<ShowSettingsObj> {
    return this.service.show(context);
  }
}
