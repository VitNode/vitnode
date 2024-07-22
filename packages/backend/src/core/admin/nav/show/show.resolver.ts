import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowAdminNavObj } from './dto/show.obj';
import { ShowAdminNavService } from './show.service';

import { AdminAuthGuards } from '@/utils';

@Resolver()
export class ShowAdminNavResolver {
  constructor(private readonly service: ShowAdminNavService) {}

  @Query(() => [ShowAdminNavObj])
  @UseGuards(AdminAuthGuards)
  async admin__nav__show(): Promise<ShowAdminNavObj[]> {
    return this.service.show();
  }
}
