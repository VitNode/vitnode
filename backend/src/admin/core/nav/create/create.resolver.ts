import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateAdminNavService } from './create.service';
import { CreateAdminNavArgs } from './dto/create.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';
import { ShowCoreNav } from '@/src/core/nav/show/dto/show.obj';

@Resolver()
export class CreateAdminNavResolver {
  constructor(private readonly service: CreateAdminNavService) {}

  @Mutation(() => ShowCoreNav)
  @UseGuards(AdminAuthGuards)
  async core_nav__admin__create(@Args() args: CreateAdminNavArgs): Promise<ShowCoreNav> {
    return await this.service.create(args);
  }
}
