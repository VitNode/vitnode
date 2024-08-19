import { Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';

import { ShowSettingsService } from './show.service';
import { ShowSettingsObj } from './dto/show.obj';

@Resolver()
export class ShowCoreSettingsResolver {
  constructor(private readonly service: ShowSettingsService) {}

  // @SkipThrottle()
  @Query(() => ShowSettingsObj)
  async core_settings__show(): Promise<ShowSettingsObj> {
    return this.service.show();
  }
}
