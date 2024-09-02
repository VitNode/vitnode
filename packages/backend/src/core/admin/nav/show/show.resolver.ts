import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { ShowAdminNavObj } from './show.dto';
import { ShowAdminNavService } from './show.service';

@Resolver()
export class ShowAdminNavResolver {
  constructor(private readonly service: ShowAdminNavService) {}

  @Query(() => [ShowAdminNavObj])
  @UseGuards(AdminAuthGuards)
  async admin__nav__show(): Promise<ShowAdminNavObj[]> {
    return this.service.show();
  }
}
