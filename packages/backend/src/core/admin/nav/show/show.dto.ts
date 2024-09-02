import { Field, ObjectType } from '@nestjs/graphql';

import { ShowAdminNavPluginsObj } from '../../plugins/nav/show/show.dto';

@ObjectType()
export class ShowAdminNavObj {
  @Field(() => String)
  code: string;

  @Field(() => [ShowAdminNavPluginsObj])
  nav: ShowAdminNavPluginsObj[];
}
