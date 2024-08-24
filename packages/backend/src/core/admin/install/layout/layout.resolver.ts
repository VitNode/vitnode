import { Query, Resolver } from '@nestjs/graphql';

import { LayoutAdminInstallObj } from './dto/layout.obj';
import { LayoutAdminInstallService } from './layout.service';

@Resolver()
export class LayoutAdminInstallResolver {
  constructor(private readonly service: LayoutAdminInstallService) {}

  @Query(() => LayoutAdminInstallObj)
  async admin__install__layout(): Promise<LayoutAdminInstallObj> {
    return this.service.layout();
  }
}
