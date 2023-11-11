import { Query, Resolver } from '@nestjs/graphql';

import { LayoutAdminInstallService } from './layout-admin_install.service';
import { LayoutAdminInstallObj } from './dto/layout-admin_install.obj';

@Resolver()
export class LayoutAdminInstallResolver {
  constructor(private readonly service: LayoutAdminInstallService) {}

  @Query(() => LayoutAdminInstallObj)
  async layout_admin_install(): Promise<LayoutAdminInstallObj> {
    return await this.service.layout();
  }
}
