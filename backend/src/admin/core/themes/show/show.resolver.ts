import { Query, Resolver } from '@nestjs/graphql';
import { ShowAdminThemesService } from './show.service';
import { UseGuards } from '@nestjs/common';
import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class ShowAdminThemesResolver {
  constructor(private readonly service: ShowAdminThemesService) {}

  @Query(() => String)
  @UseGuards(AdminAuthGuards)
  async core_themes__admin__show(): Promise<string> {
    return await this.service.show();
  }
}
