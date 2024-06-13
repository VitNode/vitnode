import { Query, Resolver } from "@nestjs/graphql";

import { LanguagesCoreMiddlewareService } from "./languages.service";
import { LanguagesCoreMiddlewareObj } from "./dto/languages.obj";

@Resolver()
export class LanguagesCoreMiddlewareResolver {
  constructor(private readonly service: LanguagesCoreMiddlewareService) {}

  @Query(() => [LanguagesCoreMiddlewareObj])
  async core_middleware__languages(): Promise<LanguagesCoreMiddlewareObj[]> {
    return this.service.languages();
  }
}
