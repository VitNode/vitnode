import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { ShowAdminCoreAiObj } from './show.dto';
import { ShowAdminCoreAiService } from './show.service';

@Resolver()
export class ShowAdminCoreAiResolver {
  constructor(private readonly service: ShowAdminCoreAiService) {}

  @Query(() => ShowAdminCoreAiObj)
  @UseGuards(AdminAuthGuards)
  admin__core_ai__show(): ShowAdminCoreAiObj {
    return this.service.show();
  }
}
