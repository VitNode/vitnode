import { Field, ObjectType } from '@nestjs/graphql';

import { ShowAdminNavPluginsObj } from '@/core/admin/plugins/nav/show/dto/show.obj';

@ObjectType()
export class ShowAdminNavObj {
  @Field(() => String)
  code: string;

  @Field(() => [ShowAdminNavPluginsObj])
  nav: ShowAdminNavPluginsObj[];
}
