import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateCoreGroupsService } from './create-core_groups.service';
import { CreateCoreGroupsObj } from './dto/create-core_groups.obj';
import { CreateCoreGroupsArgs } from './dto/create-core_groups.args';

@Resolver()
export class CreateCoreGroupsResolver {
  constructor(private readonly service: CreateCoreGroupsService) {}

  @Mutation(() => CreateCoreGroupsObj)
  async create_core_groups(@Args() args: CreateCoreGroupsArgs): Promise<CreateCoreGroupsObj> {
    return this.service.create(args);
  }
}
