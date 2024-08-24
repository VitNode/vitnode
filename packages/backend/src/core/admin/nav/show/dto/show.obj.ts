import { ShowAdminNavPluginsObj } from '@/core/admin/plugins/nav/show/dto/show.obj';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminNavObj {
  @Field(() => String)
  code: string;

  @Field(() => [ShowAdminNavPluginsObj])
  nav: ShowAdminNavPluginsObj[];
}
