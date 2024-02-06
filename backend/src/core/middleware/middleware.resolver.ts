import { Context, Query, Resolver } from "@nestjs/graphql";

import { CoreMiddlewareService } from "../middleware/middleware.service";
import { CoreMiddlewareObj } from "./dto/middleware.obj";

import { Ctx } from "@/types/context.type";

@Resolver()
export class CoreMiddlewareResolver {
  constructor(private readonly service: CoreMiddlewareService) {}

  @Query(() => CoreMiddlewareObj)
  async core_middleware(@Context() context: Ctx): Promise<CoreMiddlewareObj> {
    return await this.service.middleware(context);
  }
}
