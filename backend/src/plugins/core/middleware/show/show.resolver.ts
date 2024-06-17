import { Query, Resolver } from "@nestjs/graphql";

import { ShowCoreMiddlewareService } from "./show.service";
import { ShowCoreMiddlewareObj } from "./dto/languages.obj";

@Resolver()
export class ShowCoreMiddlewareResolver {
  constructor(private readonly service: ShowCoreMiddlewareService) {}

  @Query(() => ShowCoreMiddlewareObj)
  async core_middleware__show(): Promise<ShowCoreMiddlewareObj> {
    return this.service.languages();
  }
}
